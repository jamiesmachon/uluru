import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  UserEntity,
  UsersRepositoryInterface,
  CreateUserDTO,
  generateUsernameFromEmail,
  hashPassword,
  UpdateUserDTO,
  createValidationCode,
} from '@app/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async getAll(where: object): Promise<UserEntity[]> {
    return await this.usersRepository.findAll({
      where: { ...where },
    });
  }

  async getBy(where: object): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { ...where },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async create(newUser: CreateUserDTO): Promise<UserEntity> {
    const { email, password } = newUser;

    // check if a user with the email address already exists
    const existingUser = await this.getBy({ email: email });
    if (existingUser) {
      throw new ConflictException('An account with that email already exists');
    }

    // create a validationCode token
    const validationCode = createValidationCode();

    // hash the password
    const [salt, hash] = await hashPassword(password);

    const savedUser = await this.usersRepository.save({
      ...newUser,
      username: generateUsernameFromEmail(email),
      password: hash,
      salt: salt,
      validationCode: validationCode,
    });

    return savedUser;
  }

  async update(
    id: number,
    body: UpdateUserDTO,
  ): Promise<UserEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.usersRepository.update(id, body);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
