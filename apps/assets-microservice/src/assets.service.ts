import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AssetEntity, AssetsRepositoryInterface } from '@app/common';
import { AssetsServiceInterface } from './interfaces/assets.service.interface';

@Injectable()
export class AssetsService implements AssetsServiceInterface {
  constructor(
    @Inject('AssetsRepositoryInterface')
    private readonly assetsRepository: AssetsRepositoryInterface,
  ) {}

  async create(data: any): Promise<AssetEntity> {
    return await this.assetsRepository.save(data);
  }

  async getAll(): Promise<AssetEntity[]> {
    return await this.assetsRepository.findAll();
  }

  async getBy(where: object): Promise<AssetEntity> {
    return this.assetsRepository.findByCondition({
      where: { ...where },
    });
  }

  async update(id: number, data: any): Promise<AssetEntity | UpdateResult> {
    const user = await this.getBy({ id: id }).then((res) => res);
    if (user) return await this.assetsRepository.update(id, data);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.assetsRepository.delete(id);
  }
}
