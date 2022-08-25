import * as Joi from '@hapi/joi';
import { User } from '../api/entities/user.entity';

export class PostgresConfig {
  private readonly options;
  private readonly envConfig: IEnvConfigInterface;

  constructor() {

    this.envConfig = this.validateInput(process.env);
    this.options =
    {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [User],
      keepConnectionAlive: true,
    };
  }

  public getOptions() {
    return this.options;
  }

  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test')
        .default('development'),
      PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export default interface IEnvConfigInterface {
  [key: string]: string;
}
