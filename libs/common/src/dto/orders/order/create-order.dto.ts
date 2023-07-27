import { OrderStatus } from '@app/common/entities/orders/order.entity';
import { CreateOrderItemDto } from '../../order-items';

export class CreateOrderDTO {
  orderNumber: string;
  userId: number;
  status: OrderStatus;
  items: CreateOrderItemDto[];
}
