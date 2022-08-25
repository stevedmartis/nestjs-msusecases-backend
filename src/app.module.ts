import * as dotenv from 'dotenv';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig, PostgresConfig, HttpConfig } from './config';
import { LoggerMiddleware } from './api/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { dotEnvOptions, HealthController } from './api/utils';
import { TerminusModule } from '@nestjs/terminus';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { PostController, UserController, UserMemoryController } from './api/controller';
import { PostService, UserMemoryService, UserService } from './api/service';
import { UserRepository } from './api/repository';
import { User } from './api/entities';

dotenv.config({ path: dotEnvOptions.path });

const logger: LoggerConfig = new LoggerConfig();
const postgresOptions: PostgresConfig = new PostgresConfig();
const http: HttpConfig = new HttpConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WinstonModule.forRoot(logger.console()),
    TypeOrmModule.forRoot(postgresOptions.getOptions()),
    TypeOrmModule.forFeature([User]),
    InMemoryDBModule.forRoot({}),
    HttpModule.register(http.getOptions()),
    TerminusModule,
    
  ],
  controllers: [UserController, UserMemoryController, PostController, HealthController],
  providers: [UserService, PostService, UserMemoryService, UserRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController, UserMemoryController);
  }
}
