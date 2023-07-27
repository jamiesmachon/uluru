import { OrderEntity, UpdateOrderDTO } from '@app/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateOrderDTO } from '@app/common';

export interface OrdersServiceInterface {
  getAll(where: object): Promise<OrderEntity[]>;
  getBy(where: object): Promise<OrderEntity>;
  create(order: CreateOrderDTO): Promise<OrderEntity>;
  update(id: number, body: UpdateOrderDTO): Promise<OrderEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
