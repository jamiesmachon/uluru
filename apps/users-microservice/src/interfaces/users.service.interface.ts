import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity, CreateUserDTO, UpdateUserDTO } from '@app/common';

export interface UsersServiceInterface {
  create(user: CreateUserDTO): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
  getBy(where: object): Promise<UserEntity>;
  update(id: number, user: UpdateUserDTO): Promise<UserEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
