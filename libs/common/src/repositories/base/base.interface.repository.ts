import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: number): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  update(
    id: number,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  query(sql: string, parameters?: any[]): Promise<any>;
}
