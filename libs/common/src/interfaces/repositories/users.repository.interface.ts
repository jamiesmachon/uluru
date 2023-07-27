import { BaseInterfaceRepository } from '../../repositories/base/base.interface.repository';
import { UserEntity } from '../../entities/users/user.entity';

export interface UsersRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
