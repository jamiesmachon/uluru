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
  CreateTranslationDTO,
  GetTranslationsDTO,
  UpdateTranslationDTO,
} from '@app/common';

@Controller('translations')
export class TranslationsController implements CommonControllerInterface {
  constructor(
    @Inject('TRANSLATIONS_SERVICE')
    private readonly translationsService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post()
  async create(@Req() req: UserRequest, @Body() body: CreateTranslationDTO) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.translationsService.send(
      {
        cmd: 'translations.create',
      },
      {
        body,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get()
  async getAll(@Req() req: UserRequest, @Body() body: GetTranslationsDTO) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.translationsService.send(
      {
        cmd: 'translations.get-all',
      },
      body,
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get(':id')
  async get(@Req() req: UserRequest, @Param('id') id: number) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.translationsService.send(
      {
        cmd: 'translations.get',
      },
      {
        id,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Patch(':id')
  async update(
    @Req() req: UserRequest,
    @Param('id') id: number,
    @Body() body: UpdateTranslationDTO,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.translationsService.send(
      {
        cmd: 'translations.update',
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

    return this.translationsService.send(
      {
        cmd: 'translations.delete',
      },
      {
        id,
      },
    );
  }
}
