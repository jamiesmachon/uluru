import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'ordermeta',
})
export class OrderMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: string;

  @Column({
    name: 'order_id',
  })
  orderId: string;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
