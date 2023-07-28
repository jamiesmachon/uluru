import { RegisteredUserDTO } from './registered-user.dto';

export class LoggedInUserDTO extends RegisteredUserDTO {
  accessToken: string;
}
