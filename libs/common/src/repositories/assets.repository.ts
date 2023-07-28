import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { AssetEntity } from '../entities';
import { AssetsRepositoryInterface } from '../interfaces';

@Injectable()
export class AssetsRepository
  extends BaseAbstractRepository<AssetEntity>
  implements AssetsRepositoryInterface
{
  constructor(
    @InjectRepository(AssetEntity)
    private readonly AssetRepository: Repository<AssetEntity>,
  ) {
    super(AssetRepository);
  }
}
