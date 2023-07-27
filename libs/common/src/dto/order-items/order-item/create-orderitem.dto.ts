import { OrderItemTypes } from '@app/common/entities/order-items/order-item.entity';

export class CreateOrderItemDTO {
  productId: number;
  type: OrderItemTypes;
}
