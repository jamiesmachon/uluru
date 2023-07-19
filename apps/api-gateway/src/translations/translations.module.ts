import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { TranslationsController } from './translations.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq(
      'TRANSLATIONS_SERVICE',
      process.env.RABBITMQ_TRANSLATIONS_QUEUE,
    ),
  ],
  controllers: [TranslationsController],
})
export class TranslationsModule {}
