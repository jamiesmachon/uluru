import { BaseInterfaceRepository } from '../../repositories/base/base.interface.repository';
import { TranslationEntity } from '../../entities/translation.entity';

export interface TranslationsRepositoryInterface
  extends BaseInterfaceRepository<TranslationEntity> {}
