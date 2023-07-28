import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  HttpExceptionFilter,
  MysqlModule,
  ProductEntity,
  ProductMetaEntity,
  RabbitMQModule,
  RabbitMQService,
  ProductsRepository,
} from '@app/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MysqlModule,
    RabbitMQModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    TypeOrmModule.forFeature([ProductEntity, ProductMetaEntity]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'RabbitMQServiceInterface',
      useClass: RabbitMQService,
    },
    {
      provide: 'ProductsServiceInterface',
      useClass: ProductsService,
    },
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
