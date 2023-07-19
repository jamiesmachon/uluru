import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQService } from '@app/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller()
export class OrdersController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('OrdersServiceInterface')
    private readonly ordersService: OrdersService,
  ) {}

  @MessagePattern({ cmd: 'orders.create' })
  async createOrder(
    @Ctx() context: RmqContext,
    @Payload() newOrder: CreateOrderDTO,
  ) {
    this.rmqService.ack(context);

    return this.ordersService.create(newOrder);
  }

  @MessagePattern({ cmd: 'orders.get-all' })
  async getOrders(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);

    return this.ordersService.getAll();
  }

  @MessagePattern({ cmd: 'orders.get' })
  async getOrder(@Ctx() context: RmqContext, @Payload() order: { id: number }) {
    this.rmqService.ack(context);

    return this.ordersService.getBy({ id: order.id });
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
