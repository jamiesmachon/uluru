import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { TranslationEntity } from '../entities';
import { TranslationsRepositoryInterface } from '../interfaces';

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
