import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq(
      'PRODUCTS_SERVICE',
      process.env.RABBITMQ_PRODUCTS_QUEUE,
    ),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
