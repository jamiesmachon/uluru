import { Request } from 'express';

export interface AssetRequest extends Request {
  asset?: {
    id: number;
  };
}
