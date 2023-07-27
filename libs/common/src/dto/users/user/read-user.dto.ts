import { UserRoles, UserStatus } from '@app/common/entities/users/user.entity';

export class ReadUserDTO {
  id: number;
  username: string;
  email: string;
  language?: string;
  role?: UserRoles;
  capabilities?: string;
  validationCode?: string;
  distributor?: string;
  status?: UserStatus;
  created: string;
  updated: string;
  deleted: string;
}
