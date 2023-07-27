import { DeleteResult, UpdateResult } from 'typeorm';
import {
  TranslationEntity,
  CreateTranslationDTO,
  UpdateTranslationDTO,
} from '@app/common';

export interface TranslationsServiceInterface {
  getAll(where: object): Promise<TranslationEntity[]>;
  getBy(where: object): Promise<TranslationEntity>;
  create(translation: CreateTranslationDTO): Promise<TranslationEntity>;
  update(
    id: number,
    body: UpdateTranslationDTO,
  ): Promise<TranslationEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
