import { UserRoles, UserStatus } from '@app/common/entities/users/user.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  username: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;

  salt: string;

  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  language?: string;

  role?: UserRoles;

  capabilities?: string;

  validationCode?: string;

  distributor?: string;

  status?: UserStatus;
}
