import { BaseInterfaceRepository } from '../../repositories/base/base.interface.repository';
import { OrderEntity } from '../../entities/order.entity';

export interface OrdersRepositoryInterface
  extends BaseInterfaceRepository<OrderEntity> {}
