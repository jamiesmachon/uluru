import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends OmitType(CreateUserDTO, [] as const) {
  id: number;
}
