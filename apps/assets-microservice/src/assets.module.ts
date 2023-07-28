import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  AssetEntity,
  AssetMetaEntity,
  AssetsRepository,
  HttpExceptionFilter,
} from '@app/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([AssetEntity, AssetMetaEntity]),
  ],
  controllers: [AssetsController],
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
      provide: 'AssetsServiceInterface',
      useClass: AssetsService,
    },
    {
      provide: 'AssetsRepositoryInterface',
      useClass: AssetsRepository,
    },
  ],
})
export class AssetsModule {}
