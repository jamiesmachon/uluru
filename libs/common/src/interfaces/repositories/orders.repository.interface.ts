import { OrderEntity } from '@app/common/entities';
import { BaseInterfaceRepository } from '@app/common/repositories';

export interface OrdersRepositoryInterface
  extends BaseInterfaceRepository<OrderEntity> {}
