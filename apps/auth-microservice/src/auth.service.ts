import {
  ConflictException,
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  generateUsernameFromEmail,
  UserEntity,
  UserJwt,
  UsersRepositoryInterface,
  LoginUserDTO,
  RegisterUserDTO,
  RegisteredUserDto,
  LoggedInUserDto,
} from '@app/common';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

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

  async hashPassword(password: string): Promise<[salt: string, hash: string]> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return [salt, hash];
  }

  async register(
    newUser: Readonly<RegisterUserDTO>,
  ): Promise<RegisteredUserDto> {
    const { email, password } = newUser;

    const existingUser = await this.getByEmail(email);

    if (existingUser) {
      throw new ConflictException('An account with that email already exists');
    }

    const [salt, hash] = await this.hashPassword(password);

    const savedUser = await this.usersRepository.save({
      username: generateUsernameFromEmail(email),
      email,
      salt,
      password: hash,
    });

    delete savedUser.salt;
    delete savedUser.password;

    return savedUser;
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    let user = await this.getByUsername(username);
    let userExists = !!user;

    if (!userExists) {
      user = await this.getByEmail(username);
      userExists = !!user;
    }

    if (!userExists) return null;

    const passwordMatches = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!passwordMatches) return null;

    return user;
  }

  async login(loginUser: Readonly<LoginUserDTO>): Promise<LoggedInUserDto> {
    const { username, password } = loginUser;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    delete user.salt;

    const jwt = await this.jwtService.signAsync({ user });

    return { ...user, accessToken: jwt };
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
}
