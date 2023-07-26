import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQService, CreateUserDTO, UpdateUserDTO } from '@app/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'users.create' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() newUser: CreateUserDTO,
  ) {
    this.rmqService.ack(context);

    return this.usersService.create(newUser);
  }

  @MessagePattern({ cmd: 'users.get-all' })
  async getUsers(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);

    return this.usersService.getAll();
  }

  @MessagePattern({ cmd: 'users.get' })
  async getUser(@Ctx() context: RmqContext, @Payload() user: { id: number }) {
    this.rmqService.ack(context);

    return this.usersService.getBy({ id: user.id });
  }

  @MessagePattern({ cmd: 'users.update' })
  async updateUser(
    @Ctx() context: RmqContext,
    @Payload() updateUser: UpdateUserDTO,
  ) {
    this.rmqService.ack(context);

    return this.usersService.update(updateUser.id, updateUser.body);
  }

  @MessagePattern({ cmd: 'users.delete' })
  async deleteUser(
    @Ctx() context: RmqContext,
    @Payload() user: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.usersService.delete(user.id);
  }
}
