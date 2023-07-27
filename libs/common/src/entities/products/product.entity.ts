import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductMetaEntity } from './productmeta.entity';
import { AssetEntity } from '../assets/asset.entity';
import { OrderItemEntity } from '../order-items/order-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // link product to prices

  // link the product to an asset
  @OneToOne(() => AssetEntity, (asset) => asset.product, {
    eager: true,
  })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  // link the product to an order item
  @OneToOne(() => OrderItemEntity, (item) => item.product)
  orderItem: OrderItemEntity;

  // link the product to order items
  @OneToMany(() => OrderItemEntity, (item) => item.product)
  orderItems: OrderItemEntity[];

  // link the product to the meta data
  @OneToMany(() => ProductMetaEntity, (meta) => meta.product)
  metaData: ProductMetaEntity[];
}
