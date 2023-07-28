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
  CreateProductDTO,
  UpdateProductDTO,
  UserInterceptor,
  UserRequest,
} from '@app/common';

@Controller('products')
export class ProductsController implements CommonControllerInterface {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get()
  async getAll(@Req() req: UserRequest, @Body() where: object) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.productsService.send(
      {
        cmd: 'products.get-all',
      },
      where,
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get(':id')
  async get(@Req() req: UserRequest, @Param('id') id: number) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.productsService.send(
      {
        cmd: 'products.get',
      },
      {
        id,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post()
  async create(@Req() req: UserRequest, @Body() body: CreateProductDTO) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.productsService.send(
      {
        cmd: 'products.create',
      },
      body,
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Patch(':id')
  async update(
    @Req() req: UserRequest,
    @Param('id') id: number,
    @Body() body: UpdateProductDTO,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.productsService.send(
      {
        cmd: 'products.update',
      },
      {
        id,
        ...body,
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

    return this.productsService.send(
      {
        cmd: 'products.delete',
      },
      {
        id,
      },
    );
  }
}
