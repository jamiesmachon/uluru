import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  UserEntity,
  UserMetaEntity,
  UsersRepository,
} from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([UserEntity, UserMetaEntity]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'RabbitMQServiceInterface',
      useClass: RabbitMQService,
    },
    {
      provide: 'UsersServiceInterface',
      useClass: UsersService,
    },
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
