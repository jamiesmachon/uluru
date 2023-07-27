import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateOrderDTO, RabbitMQService, UpdateOrderDTO } from '@app/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('OrdersServiceInterface')
    private readonly ordersService: OrdersService,
  ) {}

  @MessagePattern({ cmd: 'orders.get-all' })
  async getOrders(@Ctx() context: RmqContext, @Payload() where: object) {
    this.rmqService.ack(context);

    return this.ordersService.getAll(where);
  }

  @MessagePattern({ cmd: 'orders.get' })
  async getOrder(@Ctx() context: RmqContext, @Payload() order: { id: number }) {
    this.rmqService.ack(context);

    return this.ordersService.getBy({ id: order.id });
  }

  @MessagePattern({ cmd: 'orders.create' })
  async createOrder(
    @Ctx() context: RmqContext,
    @Payload() newOrder: CreateOrderDTO,
  ) {
    this.rmqService.ack(context);

    return this.ordersService.create(newOrder);
  }

  @MessagePattern({ cmd: 'orders.update' })
  async updateUser(
    @Ctx() context: RmqContext,
    @Payload() updateOrder: UpdateOrderDTO,
  ) {
    this.rmqService.ack(context);

    return this.ordersService.update(updateOrder.id, updateOrder);
  }

  @MessagePattern({ cmd: 'orders.delete' })
  async deleteUser(
    @Ctx() context: RmqContext,
    @Payload() order: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.ordersService.delete(order.id);
  }
}
