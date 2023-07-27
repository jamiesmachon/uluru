import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../orders/order.entity';
import { OrderItemMetaEntity } from './order-itemmeta.entity';
import { ProductEntity } from '../products/product.entity';

export enum OrderItemTypes {
  LINEITEM = 'line_item', // A product that is being sold as part of the order.
  SHIPPING = 'shipping', // The cost of shipping for the order.
  TAX = 'tax', // The tax amount for the order.
  COUPON = 'coupon', // A discount applied to the order.
}

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // link the order item to a product
  @OneToOne(() => ProductEntity, (product) => product.orderItem, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({
    type: 'enum',
    enum: OrderItemTypes,
    default: OrderItemTypes.LINEITEM,
  })
  type: OrderItemTypes;

  // link the order item to the meta data
  @OneToMany(() => OrderItemMetaEntity, (meta) => meta.orderItem)
  metaData: OrderItemMetaEntity[];

  // link the order item to an order
  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
