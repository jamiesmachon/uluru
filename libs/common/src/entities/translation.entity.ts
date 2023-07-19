import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('translations')
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  set: string;

  @Column()
  key: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @DeleteDateColumn()
  deleted: string;
}
