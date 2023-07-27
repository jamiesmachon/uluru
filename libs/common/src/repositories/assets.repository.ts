import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from '../entities/assets/asset.entity';
import { AssetsRepositoryInterface } from '../interfaces/repositories/assets.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

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
