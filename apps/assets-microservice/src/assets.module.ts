import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MysqlModule,
  RabbitMQModule,
  RabbitMQService,
  AssetEntity,
  AssetMetaEntity,
  AssetsRepository,
} from '@app/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([AssetEntity, AssetMetaEntity]),
  ],
  controllers: [AssetsController],
  providers: [
    {
      provide: 'RabbitMQServiceInterface',
      useClass: RabbitMQService,
    },
    {
      provide: 'AssetsServiceInterface',
      useClass: AssetsService,
    },
    {
      provide: 'AssetsRepositoryInterface',
      useClass: AssetsRepository,
    },
  ],
})
export class AssetsModule {}
