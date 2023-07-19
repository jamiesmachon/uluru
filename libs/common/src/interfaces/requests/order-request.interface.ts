import { Request } from 'express';

export interface OrderRequest extends Request {
  order?: {
    id: number;
  };
}
