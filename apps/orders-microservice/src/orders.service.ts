import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  CreateOrderDTO,
  OrderEntity,
  OrdersRepositoryInterface,
  UpdateOrderDTO,
} from '@app/common';
import { OrdersServiceInterface } from './interfaces/orders.service.interface';

@Injectable()
export class OrdersService implements OrdersServiceInterface {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly ordersRepository: OrdersRepositoryInterface,
  ) {}

  async getAll(where: object): Promise<OrderEntity[]> {
    return await this.ordersRepository.findAll({
      where: { ...where },
    });
  }

  async getBy(where: object): Promise<OrderEntity> {
    return this.ordersRepository.findByCondition({
      where: { ...where },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async create(data: CreateOrderDTO): Promise<OrderEntity> {
    return await this.ordersRepository.save(data);
  }

  async update(
    id: number,
    body: UpdateOrderDTO,
  ): Promise<OrderEntity | UpdateResult> {
    const order = await this.getBy({ id: id }).then((res) => res);
    if (order) return await this.ordersRepository.update(id, body);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }
}
