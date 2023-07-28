import { Request } from 'express';

export interface ProductRequest extends Request {
  product?: {
    id: number;
  };
}
