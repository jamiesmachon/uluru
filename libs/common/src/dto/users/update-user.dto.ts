import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO {
  id: number;
  body: Omit<CreateUserDTO, 'id'>;
}
