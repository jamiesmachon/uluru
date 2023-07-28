import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  CreateProductDTO,
  RabbitMQService,
  UpdateProductDTO,
} from '@app/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('ProductsServiceInterface')
    private readonly productsService: ProductsService,
  ) {}

  @MessagePattern({ cmd: 'products.get-all' })
  async getProducts(@Ctx() context: RmqContext, @Payload() where: object) {
    this.rmqService.ack(context);

    return this.productsService.getAll(where);
  }

  @MessagePattern({ cmd: 'products.get' })
  async getProduct(
    @Ctx() context: RmqContext,
    @Payload() product: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.productsService.getBy({ id: product.id });
  }

  @MessagePattern({ cmd: 'products.create' })
  async createProduct(
    @Ctx() context: RmqContext,
    @Payload() newProduct: CreateProductDTO,
  ) {
    this.rmqService.ack(context);

    return this.productsService.create(newProduct);
  }

  @MessagePattern({ cmd: 'products.update' })
  async updateProduct(
    @Ctx() context: RmqContext,
    @Payload() updateProduct: UpdateProductDTO,
  ) {
    this.rmqService.ack(context);

    return this.productsService.update(updateProduct.id, updateProduct);
  }

  @MessagePattern({ cmd: 'products.delete' })
  async deleteProduct(
    @Ctx() context: RmqContext,
    @Payload() product: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.productsService.delete(product.id);
  }
}
