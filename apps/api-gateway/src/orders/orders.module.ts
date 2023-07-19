import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq(
      'ORDERS_SERVICE',
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
