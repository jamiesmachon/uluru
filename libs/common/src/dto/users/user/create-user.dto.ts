import { UserRoles, UserStatus } from '@app/common/entities/users/user.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;

  salt?: string;

  username?: string;

  language: string;

  role: UserRoles;

  capabilities: string;

  validationCode?: string;

  distributor: string;

  status: UserStatus;
}
