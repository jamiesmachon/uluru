import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AssetEntity } from './asset.entity';

@Entity({
  name: 'assetmeta',
})
export class AssetMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: number;

  // link the meta data to an asset
  @ManyToOne(() => AssetEntity, (asset) => asset.metaData, { nullable: false })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
