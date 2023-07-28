import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserEntity } from '../entities';
import { UsersRepositoryInterface } from '../interfaces';

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
