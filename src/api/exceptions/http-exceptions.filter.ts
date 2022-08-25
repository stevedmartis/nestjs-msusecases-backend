import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse, InvalidParametersErrorResponse } from '../response';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { dotEnvOptions } from '../utils';
import { loggers } from 'winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const logger = loggers.get('winston-logger')

        const env = dotenv.parse(fs.readFileSync(dotEnvOptions.path));
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = (exception.getStatus) ? exception.getStatus() : 500;

        let objError;
        if (exception.getResponse() instanceof ErrorResponse ||
            exception.getResponse()["response"] instanceof ErrorResponse) {

            objError = exception.getResponse();

        } else {
            objError = new ErrorResponse();

            if (exception.getResponse()["error"] != undefined ||
                exception.getResponse()["error"] != null) {
                objError.title = exception.getResponse()["error"];
                objError.detail = exception.message;
            } else {
                objError.title = exception.name;
                objError.detail = exception.message;
            }

            objError.type = env["ERROR_FILTER_TYPE"] || "";
            objError.status = status;
            objError.codigoDeError = status;

            let invalidParamsList = Array<InvalidParametersErrorResponse>();

            if (Array.isArray(exception.getResponse()["message"]) && exception.getResponse()["message"].length > 0) {
                exception.getResponse()["message"].forEach(key => {
                    let objStr = JSON.parse(key);
                    let invalidParams: InvalidParametersErrorResponse = {
                        name: objStr.name,
                        reason: objStr.reason
                    }
                    invalidParamsList.push(invalidParams);
                });

                objError["invalid-params"] = invalidParamsList;

            }

            logger.error(
                'status: ' + objError.status + ', ' + objError.detail + (objError["invalid-params"] ? ', Invalid Params' : ''), //message
                {
                    status: objError.status,
                    objError
                } //metadata
            );

        }

        response
            .status(status)
            .json({
                "$schema": "http://json-schema.org/draft-04/schema#",
                "description": "Esquema JSON de respuesta para casos de Error o Falla.",
                "type": "object",
                properties: objError
            });
    }
}
