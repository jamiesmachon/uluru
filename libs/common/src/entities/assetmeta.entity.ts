import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'assetmeta',
})
export class AssetMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: string;

  @Column({
    name: 'asset_id',
  })
  fileId: string;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
