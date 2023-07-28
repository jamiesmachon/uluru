import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductsServiceInterface } from './interfaces/products.service.interface';
import {
  CreateProductDTO,
  ProductEntity,
  ProductsRepositoryInterface,
  UpdateProductDTO,
} from '@app/common';

@Injectable()
export class ProductsService implements ProductsServiceInterface {
  constructor(
    @Inject('ProductsRepositoryInterface')
    private readonly productsRepository: ProductsRepositoryInterface,
  ) {}

  async getAll(where: object): Promise<ProductEntity[]> {
    return await this.productsRepository.findAll({
      where: { ...where },
    });
  }

  async getBy(where: object): Promise<ProductEntity> {
    return this.productsRepository.findByCondition({
      where: { ...where },
      // select: ['id', 'username', 'email', 'password'],
    });
  }

  async create(newProduct: CreateProductDTO): Promise<ProductEntity> {
    const savedProduct = await this.productsRepository.save(newProduct);

    return savedProduct;
  }

  async update(
    id: number,
    body: UpdateProductDTO,
  ): Promise<ProductEntity | UpdateResult> {
    const product = await this.getBy({ id: id }).then((res) => res);
    if (product) return await this.productsRepository.update(id, body);
    return;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productsRepository.delete(id);
  }
}
