import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { AssetsController } from './assets.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq(
      'ASSETS_SERVICE',
      process.env.RABBITMQ_ASSETS_QUEUE,
    ),
  ],
  controllers: [AssetsController],
})
export class AssetsModule {}
