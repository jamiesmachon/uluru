import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserMetaEntity } from './usermeta.entity';
import { OrderEntity } from '../orders/order.entity';

export enum UserRoles {
  GLOBALSUPERADMIN = 'global-super-admin',
  SUPERADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = '1',
  INACTIVE = '0',
}

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'english' })
  language: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({ default: null })
  capabilities: string;

  @Column({ name: 'validation_code', default: null })
  validationCode: string;

  @Column({ default: 'UK' })
  distributor: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @DeleteDateColumn()
  deleted: string;

  // link the user to the meta data
  @OneToMany(() => UserMetaEntity, (meta) => meta.user)
  metaData: UserMetaEntity[];

  // link the user to the orders
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
