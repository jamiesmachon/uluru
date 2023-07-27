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
  UserInterceptor,
  UserRequest,
  CreateUserDTO,
  UpdateUserDTO,
} from '@app/common';

@Controller('users')
export class UsersController implements CommonControllerInterface {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get()
  async getAll(@Req() req: UserRequest, @Body() where: object) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.usersService.send(
      {
        cmd: 'users.get-all',
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

    return this.usersService.send(
      {
        cmd: 'users.get',
      },
      {
        id,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post()
  async create(@Req() req: UserRequest, @Body() body: CreateUserDTO) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.usersService.send(
      {
        cmd: 'users.create',
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
    @Body() body: UpdateUserDTO,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.usersService.send(
      {
        cmd: 'users.update',
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

    return this.usersService.send(
      {
        cmd: 'users.delete',
      },
      {
        id,
      },
    );
  }
}
