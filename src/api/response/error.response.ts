import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ExternalServiceErrorResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    message: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    status: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    stack: string;
}

export class InvalidParametersErrorResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    reason: string;

}

export class ErrorResponse {

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    detail: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    status: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    instance?: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    codigoDeError: number;

    @IsArray()
    @ApiProperty()
    @IsOptional()
    'invalid-params'?: InvalidParametersErrorResponse[];

    @IsArray()
    @ApiProperty()
    @IsOptional()
    'external-service-error'?: ExternalServiceErrorResponse;

}