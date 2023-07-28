import { CreateProductDTO, ProductEntity, UpdateProductDTO } from '@app/common';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface ProductsServiceInterface {
  getAll(where: object): Promise<ProductEntity[]>;
  getBy(where: object): Promise<ProductEntity>;
  create(user: CreateProductDTO): Promise<ProductEntity>;
  update(
    id: number,
    body: UpdateProductDTO,
  ): Promise<ProductEntity | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
