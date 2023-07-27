import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'productmeta',
})
export class ProductMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: number;

  // link the meta data to the product
  @ManyToOne(() => ProductEntity, (product) => product.metaData, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
