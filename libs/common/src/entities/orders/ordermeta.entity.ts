import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'ordermeta',
})
export class OrderMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: number;

  // link the order meta to an order
  @ManyToOne(() => OrderEntity, (order) => order.metaData, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
