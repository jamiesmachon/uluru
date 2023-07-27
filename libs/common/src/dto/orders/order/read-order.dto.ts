import { OrderStatus } from '@app/common/entities/orders/order.entity';

export class ReadOrderDTO {
  id: number;
  orderNumber: string;
  userId: number;
  status: OrderStatus;
  created: string;
  updated: string;
  deleted: string;
}
