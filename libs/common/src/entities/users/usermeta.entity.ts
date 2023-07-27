import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'usermeta',
})
export class UserMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: number;

  // link the meta data to a user
  @ManyToOne(() => UserEntity, (user) => user.metaData, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;
}
