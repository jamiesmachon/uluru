import { DeleteResult, UpdateResult } from 'typeorm';
import { AssetEntity, CreateAssetDTO, UpdateAssetDTO } from '@app/common';

export interface AssetsServiceInterface {
  getAll(where: object): Promise<AssetEntity[]>;
  getBy(where: object): Promise<AssetEntity>;
  create(asset: CreateAssetDTO): Promise<AssetEntity>;
  update(id: number, body: UpdateAssetDTO): Promise<AssetEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
