import { TranslationEntity } from '@app/common/entities';
import { BaseInterfaceRepository } from '@app/common/repositories';

export interface TranslationsRepositoryInterface
  extends BaseInterfaceRepository<TranslationEntity> {}
