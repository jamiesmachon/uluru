import { OrderStatus } from '@app/common/entities';
import { CreateOrderItemDTO } from '../../order-items';

export class CreateOrderDTO {
  orderNumber: string;
  userId: number;
  status: OrderStatus;
  items: CreateOrderItemDTO[];
}
