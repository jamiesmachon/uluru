import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  AssetEntity,
  AssetsRepositoryInterface,
  CreateAssetDTO,
  UpdateAssetDTO,
} from '@app/common';
import { AssetsServiceInterface } from './interfaces/assets.service.interface';

@Injectable()
export class AssetsService implements AssetsServiceInterface {
  constructor(
    @Inject('AssetsRepositoryInterface')
    private readonly assetsRepository: AssetsRepositoryInterface,
  ) {}

  async getAll(where: object): Promise<AssetEntity[]> {
    return await this.assetsRepository.findAll({
      where: { ...where },
    });
  }

  async getBy(where: object): Promise<AssetEntity> {
    return this.assetsRepository.findByCondition({
      where: { ...where },
    });
  }

  async create(data: CreateAssetDTO): Promise<AssetEntity> {
    return await this.assetsRepository.save(data);
  }

  async update(
    id: number,
    data: UpdateAssetDTO,
  ): Promise<AssetEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.assetsRepository.update(id, data);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.assetsRepository.delete(id);
  }
}
