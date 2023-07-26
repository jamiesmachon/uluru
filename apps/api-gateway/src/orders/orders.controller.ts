import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthGuard,
  CommonControllerInterface,
  CreateOrderDTO,
  UpdateOrderDTO,
  UserInterceptor,
  UserRequest,
} from '@app/common';

@Controller('orders')
export class OrdersController implements CommonControllerInterface {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get()
  async getAll(@Req() req: UserRequest) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.ordersService.send(
      {
        cmd: 'orders.get-all',
      },
      {},
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get(':id')
  async get(@Req() req: UserRequest, @Param('id') id: number) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.ordersService.send(
      {
        cmd: 'orders.get',
      },
      {
        id,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post()
  async create(@Req() req: UserRequest, @Body() body: CreateOrderDTO) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.ordersService.send(
      {
        cmd: 'orders.create',
      },
      {
        body,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Patch(':id')
  async update(
    @Req() req: UserRequest,
    @Param('id') id: number,
    @Body() body: UpdateOrderDTO,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.ordersService.send(
      {
        cmd: 'orders.update',
      },
      {
        id,
        body,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Delete(':id')
  async delete(@Req() req: UserRequest, @Param('id') id: number) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.ordersService.send(
      {
        cmd: 'orders.delete',
      },
      {
        id,
      },
    );
  }
}
