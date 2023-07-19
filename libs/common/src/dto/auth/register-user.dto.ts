import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;
}
