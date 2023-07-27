import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderMetaEntity } from './ordermeta.entity';
import { OrderItemEntity } from '../order-items/order-item.entity';
import { UserEntity } from '../users/user.entity';

export enum OrderStatus {
  PENDING = 'pending', // Order received, no payment initiated.
  FAILED = 'failed', // Payment failed or was declined.
  ONHOLD = 'on-hold', // Awaiting payment or processing.
  PROCESSING = 'processing', // Payment received and stock has been reduced, order is awaiting fulfillment.
  COMPLETED = 'completed', // Order fulfilled and complete.
  REFUNDED = 'refunded', // Refunded by an admin or the customer.
  CANCELLED = 'cancelled', // Cancelled by an admin or the customer.
  TRASH = 'trash', // Order moved to trash.
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number' })
  orderNumber: string;

  // link the order to a user
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @DeleteDateColumn()
  deleted: string;

  // link the order to the meta data
  @OneToMany(() => OrderMetaEntity, (meta) => meta.order)
  metaData: OrderMetaEntity[];

  // link the order to the order items
  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}
