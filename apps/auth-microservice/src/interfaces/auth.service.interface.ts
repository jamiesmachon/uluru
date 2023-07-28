import {
  UserEntity,
  UserJwt,
  RegisterUserDTO,
  LoginUserDTO,
  RegisteredUserDTO,
  LoggedInUserDTO,
  ValidateUserDTO,
} from '@app/common';
import { Response } from 'express';
import { UpdateResult } from 'typeorm';

export interface AuthServiceInterface {
  register(newUser: Readonly<RegisterUserDTO>): Promise<RegisteredUserDTO>;
  validate(
    validateUser: Readonly<ValidateUserDTO>,
  ): Promise<UserEntity | UpdateResult>;
  login(
    existingUser: Readonly<LoginUserDTO>,
    response: Response,
  ): Promise<LoggedInUserDTO>;
  verifyUser(username: string, password: string): Promise<UserEntity>;
  verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
  getUserById(id: number): Promise<UserEntity>;
  getByUsername(username: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
}
