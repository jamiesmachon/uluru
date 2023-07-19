import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OrderEntity, OrdersRepositoryInterface } from '@app/common';
import { OrdersServiceInterface } from './interfaces/orders.service.interface';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService implements OrdersServiceInterface {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly ordersRepository: OrdersRepositoryInterface,
  ) {}

  async create(data: CreateOrderDTO): Promise<OrderEntity> {
    return await this.ordersRepository.save(data);
  }

  async getAll(): Promise<OrderEntity[]> {
    return await this.ordersRepository.findAll();
  }

  async getBy(where: object): Promise<OrderEntity> {
    return this.ordersRepository.findByCondition({
      where: { ...where },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async update(
    id: number,
    data: UpdateOrderDTO,
  ): Promise<OrderEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.ordersRepository.update(id, data);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }
}
