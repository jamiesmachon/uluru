import { UserRequest } from '@app/common';

export interface UserJwt extends UserRequest {
  iat: number;
  exp: number;
}
