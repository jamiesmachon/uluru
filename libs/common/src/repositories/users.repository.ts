import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryInterface } from '../interfaces/repositories/users.repository.interface';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<UserEntity>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly UsersRepository: Repository<UserEntity>,
  ) {
    super(UsersRepository);
  }
}
