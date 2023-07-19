import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'usermeta',
})
export class UserMetaEntity {
  @PrimaryGeneratedColumn({
    name: 'meta_id',
  })
  metaId: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'meta_key',
  })
  metaKey: string;

  @Column({
    name: 'meta_value',
  })
  metaValue: string;

  @ManyToOne(() => UserEntity, (user) => user.metaData)
  user: UserEntity;
}
