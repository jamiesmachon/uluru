import { OmitType } from '@nestjs/mapped-types';
import { CreateTranslationDTO } from './create-translation.dto';

export class UpdateTranslationDTO extends OmitType(
  CreateTranslationDTO,
  [] as const,
) {
  id: number;
}
