import {
  ConflictException,
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  generateUsernameFromEmail,
  UserEntity,
  UserJwt,
  UsersRepositoryInterface,
  LoginUserDTO,
  RegisterUserDTO,
  RegisteredUserDTO,
  LoggedInUserDTO,
  doesPasswordMatch,
  hashPassword,
  createValidationCode,
  ValidateUserDTO,
  UserStatus,
} from '@app/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    newUser: Readonly<RegisterUserDTO>,
  ): Promise<RegisteredUserDTO> {
    const { email, password } = newUser;

    // check if a user with the email address already exists
    const existingUser = await this.getByEmail(email);
    if (existingUser) {
      throw new ConflictException('An account with that email already exists');
    }

    // create a validationCode token
    const validationCode = createValidationCode();

    // hash the password
    const [salt, hash] = await hashPassword(password);

    const savedUser = await this.usersRepository.save({
      username: generateUsernameFromEmail(email),
      email,
      salt,
      password: hash,
      validationCode: validationCode,
    });

    // remove sensitive data from the user object
    delete savedUser.salt;
    delete savedUser.password;

    return savedUser;
  }

  async validate(
    validateUser: Readonly<ValidateUserDTO>,
  ): Promise<UserEntity | UpdateResult> {
    const { encryptedEmail, verificationCode } = validateUser;

    const user: UserEntity = await this.findUserByEncryptedEmailValidationCode(
      encryptedEmail,
      verificationCode,
    );

    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.update(user.id, {
      status: UserStatus.ACTIVE,
    });
  }

  async login(loginUser: Readonly<LoginUserDTO>): Promise<LoggedInUserDTO> {
    const { username, password } = loginUser;
    const user = await this.verifyUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    delete user.salt;

    const jwt = await this.jwtService.signAsync({ user });

    return { ...user, accessToken: jwt };
  }

  async verifyUser(username: string, password: string): Promise<UserEntity> {
    // try and get the user by the username provided
    let user = await this.getByUsername(username);
    let userExists = !!user;

    // if the user doesn't exist, try and get the user by the email provided
    if (!userExists) {
      user = await this.getByEmail(username);
      userExists = !!user;
    }

    // if the user still doesn't exist, return null
    if (!userExists) throw new UnauthorizedException('User not found');

    // if the user exists, check if the user is active
    if (user.status === UserStatus.INACTIVE)
      throw new UnauthorizedException('User is not active');

    // if the user exists, check if the password matches
    const passwordMatches = await doesPasswordMatch(password, user.password);

    // if the password doesn't match, return null
    if (!passwordMatches) return null;

    return user;
  }

  async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserFromHeader(jwt: string): Promise<UserJwt> {
    if (!jwt) return;

    try {
      return this.jwtService.decode(jwt) as UserJwt;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOneById(id);
  }

  async getByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { username },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { email },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async findUserByEncryptedEmailValidationCode(
    encryptedEmail: string,
    validationCode: string,
  ) {
    const query = `SELECT * FROM users WHERE SHA1(email) = '${encryptedEmail}' AND validation_code = '${validationCode}' AND status = '0' LIMIT 1`;
    const result: UserEntity[] = await this.usersRepository.query(query);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }
}
