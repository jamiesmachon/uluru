import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  UserEntity,
  UsersRepositoryInterface,
  CreateUserDTO,
  UpdateUserDTO,
} from '@app/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async create(data: CreateUserDTO): Promise<UserEntity> {
    return await this.usersRepository.save(data);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }

  async getBy(where: object): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { ...where },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async update(
    id: number,
    data: UpdateUserDTO,
  ): Promise<UserEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.usersRepository.update(id, data);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
