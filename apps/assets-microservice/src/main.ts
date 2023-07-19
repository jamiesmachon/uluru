import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RabbitMQService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { AssetsModule } from './assets.module';

async function bootstrap() {
  const app = await NestFactory.create(AssetsModule);
  const rmqService = app.get<RabbitMQService>(RabbitMQService);
  const configService = app.get<ConfigService>(ConfigService);
  const queue = configService.get('RABBITMQ_ASSETS_QUEUE');
  app.connectMicroservice<RmqOptions>(rmqService.getOptions(queue));
  app.useGlobalPipes(new ValidationPipe());
  app.startAllMicroservices();
}
bootstrap();
