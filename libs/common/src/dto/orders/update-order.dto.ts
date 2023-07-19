import { OmitType } from '@nestjs/mapped-types';
import { CreateOrderDTO } from './create-order.dto';

export class UpdateOrderDTO extends OmitType(CreateOrderDTO, [] as const) {
  id: number;
}
