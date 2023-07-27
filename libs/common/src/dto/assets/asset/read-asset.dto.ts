import {
  AssetMetaEntity,
  ProductEntity,
  UserEntity,
} from '@app/common/entities';

export class ReadAssetDTO {
  id: number;
  fileName: string;
  guid: string;
  mimeType: string;
  size: number;
  created: string;
  updated: string;
  deleted: string;
  metaData: AssetMetaEntity[];
  product: ProductEntity;
  user: UserEntity;
}
