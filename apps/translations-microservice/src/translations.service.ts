import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  TranslationEntity,
  TranslationsRepositoryInterface,
  CreateTranslationDTO,
  GetTranslationsDTO,
  UpdateTranslationDTO,
} from '@app/common';
import { TranslationsServiceInterface } from './interfaces/translations.service.interface';

@Injectable()
export class TranslationsService implements TranslationsServiceInterface {
  constructor(
    @Inject('TranslationsRepositoryInterface')
    private readonly translationsRepository: TranslationsRepositoryInterface,
  ) {}

  async create(data: CreateTranslationDTO): Promise<TranslationEntity> {
    return await this.translationsRepository.save(data);
  }

  async getAll(where: GetTranslationsDTO): Promise<TranslationEntity[]> {
    return await this.translationsRepository.findAll({ where });
  }

  async getBy(where: object): Promise<TranslationEntity> {
    return this.translationsRepository.findByCondition({
      where: { ...where },
    });
  }

  async update(
    id: number,
    data: UpdateTranslationDTO,
  ): Promise<TranslationEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.translationsRepository.update(id, data);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.translationsRepository.delete(id);
  }
}
