import { ProductEntity } from '@app/common/entities';
import { BaseInterfaceRepository } from '@app/common/repositories';

export interface ProductsRepositoryInterface
  extends BaseInterfaceRepository<ProductEntity> {}
