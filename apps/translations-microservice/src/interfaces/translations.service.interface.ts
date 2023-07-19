import { DeleteResult, UpdateResult } from 'typeorm';
import {
  TranslationEntity,
  CreateTranslationDTO,
  GetTranslationsDTO,
  UpdateTranslationDTO,
} from '@app/common';

export interface TranslationsServiceInterface {
  create(user: CreateTranslationDTO): Promise<TranslationEntity>;
  getAll(where: GetTranslationsDTO): Promise<TranslationEntity[]>;
  getBy(where: object): Promise<TranslationEntity>;
  update(
    id: number,
    user: UpdateTranslationDTO,
  ): Promise<TranslationEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
