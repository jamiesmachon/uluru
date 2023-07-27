import { UserRoles, UserStatus } from '@app/common/entities/users/user.entity';

export class UpdateUserDTO {
  id?: number;
  username?: string;
  password?: string;
  salt?: string;
  email?: string;
  language?: string;
  role?: UserRoles;
  capabilities?: string;
  validationCode?: string;
  distributor?: string;
  status?: UserStatus;
}
