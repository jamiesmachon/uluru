import { RegisteredUserDto } from './registered-user.dto';

export class LoggedInUserDto extends RegisteredUserDto {
  accessToken: string;
}
