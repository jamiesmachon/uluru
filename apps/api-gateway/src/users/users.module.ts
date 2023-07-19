import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@app/common';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    RabbitMQModule.registerRmq(
      'USERS_SERVICE',
      process.env.RABBITMQ_USERS_QUEUE,
    ),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
