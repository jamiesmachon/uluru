import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity, CreateUserDTO, UpdateUserDTO } from '@app/common';

export interface UsersServiceInterface {
  getAll(where: object): Promise<UserEntity[]>;
  getBy(where: object): Promise<UserEntity>;
  create(user: CreateUserDTO): Promise<UserEntity>;
  update(id: number, body: UpdateUserDTO): Promise<UserEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
