import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
