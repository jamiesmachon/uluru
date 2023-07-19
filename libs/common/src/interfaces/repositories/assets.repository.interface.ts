import { BaseInterfaceRepository } from '../../repositories/base/base.interface.repository';
import { AssetEntity } from '../../entities/asset.entity';

export interface AssetsRepositoryInterface
  extends BaseInterfaceRepository<AssetEntity> {}
