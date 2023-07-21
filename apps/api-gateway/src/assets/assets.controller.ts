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
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard, UserInterceptor, UserRequest } from '@app/common';
import { Buffer } from 'buffer';

@Controller('assets')
export class AssetsController {
  constructor(
    @Inject('ASSETS_SERVICE') private readonly assetsService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor, FileInterceptor('file'))
  @Post()
  async uploadAsset(
    @Req() req: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    // Send the file to the microservice using the `client` object
    return this.assetsService.send(
      {
        cmd: 'assets.upload',
      },
      file,
    );
  }
}
