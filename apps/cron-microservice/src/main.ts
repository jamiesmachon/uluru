import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CronModule } from './cron.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CronModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
