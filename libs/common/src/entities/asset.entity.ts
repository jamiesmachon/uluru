import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
}
