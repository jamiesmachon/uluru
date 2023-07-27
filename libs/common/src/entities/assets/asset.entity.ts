import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AssetMetaEntity } from './assetmeta.entity';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../users/user.entity';

@Entity({
  name: 'assets',
})
export class AssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'filename',
  })
  fileName: string;

  @Column()
  guid: string;

  @Column({
    name: 'mime_type',
  })
  mimeType: string;

  @Column()
  size: number;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @DeleteDateColumn()
  deleted: string;

  // link the asset to the meta data
  @OneToMany(() => AssetMetaEntity, (meta) => meta.asset)
  metaData: AssetMetaEntity[];

  // link the asset to a product
  @OneToOne(() => ProductEntity, (product) => product.asset)
  product: ProductEntity;

  // link the asset to a user
  @OneToOne(() => UserEntity, (user) => user.asset)
  user: UserEntity;
}
