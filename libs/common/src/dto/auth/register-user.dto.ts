import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail({}, { message: 'Enter a valid email address' })
  @IsNotEmpty({ message: 'Email address field cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;
}
