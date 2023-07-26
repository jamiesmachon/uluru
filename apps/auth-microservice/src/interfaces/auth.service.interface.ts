import {
  UserEntity,
  UserJwt,
  RegisterUserDTO,
  LoginUserDTO,
  RegisteredUserDto,
  LoggedInUserDto,
} from '@app/common';
import { Response } from 'express';

export interface AuthServiceInterface {
  getUserById(id: number): Promise<UserEntity>;
  getByUsername(username: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  register(newUser: Readonly<RegisterUserDTO>): Promise<RegisteredUserDto>;
  validateUser(username: string, password: string): Promise<UserEntity>;
  login(
    existingUser: Readonly<LoginUserDTO>,
    response: Response,
  ): Promise<LoggedInUserDto>;
  verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
}
