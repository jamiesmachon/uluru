import { UserEntity } from '@app/common/entities';
import { BaseInterfaceRepository } from '@app/common/repositories';

export interface UsersRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
