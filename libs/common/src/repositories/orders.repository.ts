import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrdersRepositoryInterface } from '../interfaces/repositories/orders.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class OrdersRepository
  extends BaseAbstractRepository<OrderEntity>
  implements OrdersRepositoryInterface
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly OrdersRepository: Repository<OrderEntity>,
  ) {
    super(OrdersRepository);
  }
}
