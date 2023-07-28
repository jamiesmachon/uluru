import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HttpExceptionFilter,
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  UserEntity,
  UserMetaEntity,
  UsersRepository,
} from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([UserEntity, UserMetaEntity]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'RabbitMQServiceInterface',
      useClass: RabbitMQService,
    },
    {
      provide: 'UsersServiceInterface',
      useClass: UsersService,
    },
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
