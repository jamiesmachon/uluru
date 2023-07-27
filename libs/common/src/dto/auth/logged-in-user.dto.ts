import { RegisteredUserDto } from './registered-user.dto';

export class LoggedInUserDto extends RegisteredUserDTO {
  accessToken: string;
}
