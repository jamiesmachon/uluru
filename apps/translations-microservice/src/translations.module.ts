import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  TranslationEntity,
  TranslationsRepository,
} from '@app/common';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([TranslationEntity]),
  ],
  controllers: [TranslationsController],
  providers: [
    {
      provide: 'RabbitMQServiceInterface',
      useClass: RabbitMQService,
    },
    {
      provide: 'TranslationsServiceInterface',
      useClass: TranslationsService,
    },
    {
      provide: 'TranslationsRepositoryInterface',
      useClass: TranslationsRepository,
    },
  ],
})
export class TranslationsModule {}
