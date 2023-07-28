import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  OrderEntity,
  OrderMetaEntity,
  OrdersRepository,
  HttpExceptionFilter,
} from '@app/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([OrderEntity, OrderMetaEntity]),
  ],
  controllers: [OrdersController],
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
      provide: 'OrdersServiceInterface',
      useClass: OrdersService,
    },
    {
      provide: 'OrdersRepositoryInterface',
      useClass: OrdersRepository,
    },
  ],
})
export class OrdersModule {}
