import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  TranslationEntity,
  TranslationsRepositoryInterface,
  CreateTranslationDTO,
  UpdateTranslationDTO,
} from '@app/common';
import { TranslationsServiceInterface } from './interfaces/translations.service.interface';

@Injectable()
export class TranslationsService implements TranslationsServiceInterface {
  constructor(
    @Inject('TranslationsRepositoryInterface')
    private readonly translationsRepository: TranslationsRepositoryInterface,
  ) {}

  async getAll(where: object): Promise<TranslationEntity[]> {
    return await this.translationsRepository.findAll({
      where: { ...where },
    });
  }

  async getBy(where: object): Promise<TranslationEntity> {
    return this.translationsRepository.findByCondition({
      where: { ...where },
    });
  }

  async create(data: CreateTranslationDTO): Promise<TranslationEntity> {
    return await this.translationsRepository.save(data);
  }

  async update(
    id: number,
    body: UpdateTranslationDTO,
  ): Promise<TranslationEntity | UpdateResult> {
    const translation = await this.getBy({ id: id }).then((res) => res);
    if (translation) return await this.translationsRepository.update(id, body);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.translationsRepository.delete(id);
  }
}
