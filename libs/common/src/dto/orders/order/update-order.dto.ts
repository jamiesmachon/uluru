import { OrderStatus } from '@app/common/entities/orders/order.entity';

export class UpdateOrderDTO {
  id?: number;
  status?: OrderStatus;
}
