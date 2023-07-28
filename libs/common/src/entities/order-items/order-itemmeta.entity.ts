import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity({
  name: 'order_itemmeta',
})
export class OrderItemMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: number;

  // link the meta data to an order item
  @ManyToOne(() => OrderItemEntity, (orderItem) => orderItem.metaData, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_item_id' })
  orderItem: OrderItemEntity;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
