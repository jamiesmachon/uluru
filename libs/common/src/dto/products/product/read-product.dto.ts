import { AssetEntity } from '@app/common/entities/assets/asset.entity';
import { OrderItemEntity } from '@app/common/entities/order-items/order-item.entity';
import { ProductMetaEntity } from '@app/common/entities/products/productmeta.entity';

export class ReadProductDTO {
  id: number;
  name: string;
  description: string;
  asset: AssetEntity;
  orderItem: OrderItemEntity;
  orderItems: OrderItemEntity[];
  metaData: ProductMetaEntity[];
}
