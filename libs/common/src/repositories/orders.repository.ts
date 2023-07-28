import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { OrderEntity } from '../entities';
import { OrdersRepositoryInterface } from '../interfaces';

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
