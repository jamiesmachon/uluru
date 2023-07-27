import { OrderItemTypes } from '@app/common/entities/order-items/order-item.entity';

export class ReadOrderItemDTO {
  id: number;
  productId: number;
  type: OrderItemTypes;
}
