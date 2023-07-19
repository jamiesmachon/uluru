import { AssetEntity } from '@app/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateAssetDTO } from '../dtos/create-asset.dto';
import { UpdateAssetDTO } from '../dtos/update-asset.dto';

export interface AssetsServiceInterface {
  create(user: CreateAssetDTO): Promise<AssetEntity>;
  getAll(): Promise<AssetEntity[]>;
  getBy(where: object): Promise<AssetEntity>;
  update(
    id: number,
    asset: UpdateAssetDTO,
  ): Promise<AssetEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
