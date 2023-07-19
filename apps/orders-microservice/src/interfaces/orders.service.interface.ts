import { OrderEntity } from '@app/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { UpdateOrderDTO } from '../dtos/update-order.dto';

export interface OrdersServiceInterface {
  create(user: CreateOrderDTO): Promise<OrderEntity>;
  getAll(): Promise<OrderEntity[]>;
  getBy(where: object): Promise<OrderEntity>;
  update(
    id: number,
    order: UpdateOrderDTO,
  ): Promise<OrderEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
