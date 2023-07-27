import { IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({ message: 'username/email field cannot be empty' })
  username: string;

  @IsNotEmpty({ message: 'password field cannot be empty' })
  password: string;
}
