import { OmitType } from '@nestjs/mapped-types';
import { CreateAssetDTO } from './create-asset.dto';

export class UpdateAssetDTO extends OmitType(CreateAssetDTO, [] as const) {
  id: number;
}
