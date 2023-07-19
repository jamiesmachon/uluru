import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  OrderEntity,
  OrderMetaEntity,
  OrdersRepository,
} from '@app/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([OrderEntity, OrderMetaEntity]),
  ],
  controllers: [OrdersController],
  providers: [
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
