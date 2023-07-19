import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { TranslationEntity } from '../entities/translation.entity';
import { TranslationsRepositoryInterface } from '../interfaces/repositories/translations.repository.interface';

@Injectable()
export class TranslationsRepository
  extends BaseAbstractRepository<TranslationEntity>
  implements TranslationsRepositoryInterface
{
  constructor(
    @InjectRepository(TranslationEntity)
    private readonly TranslationsRepository: Repository<TranslationEntity>,
  ) {
    super(TranslationsRepository);
  }
}
