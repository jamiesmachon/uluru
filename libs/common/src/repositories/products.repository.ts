import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { ProductEntity } from '../entities';
import { ProductsRepositoryInterface } from '../interfaces/repositories/products.repository.interface';

@Injectable()
export class ProductsRepository
  extends BaseAbstractRepository<ProductEntity>
  implements ProductsRepositoryInterface
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductsRepository: Repository<ProductEntity>,
  ) {
    super(ProductsRepository);
  }
}
