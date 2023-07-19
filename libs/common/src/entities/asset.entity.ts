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

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @DeleteDateColumn()
  deleted: string;
}
