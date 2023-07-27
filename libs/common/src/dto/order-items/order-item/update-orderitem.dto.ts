import { OrderItemTypes } from '@app/common/entities/order-items/order-item.entity';

export class UpdateOrderItemDTO {
  id?: number;
  productId?: number;
  type?: OrderItemTypes;
}
