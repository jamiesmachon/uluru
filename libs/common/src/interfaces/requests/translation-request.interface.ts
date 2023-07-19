import { Request } from 'express';

export interface TranslationRequest extends Request {
  translation?: {
    id: number;
  };
}
