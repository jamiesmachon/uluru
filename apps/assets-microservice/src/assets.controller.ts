import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQService } from '@app/common';
import { AssetsService } from './assets.service';

@Controller()
export class AssetsController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('AssetsServiceInterface')
    private readonly assetsService: AssetsService,
  ) {}

  @MessagePattern('assets.upload')
  async handleUploadFile(
    @Ctx() context: RmqContext,
    @Payload() fileBuffer: Buffer,
  ) {
    // this.rmqService.ack(context);

    // Process the file buffer here
    console.log('Received file buffer:', fileBuffer);
    const newFile = '';

    return this.assetsService.create(newFile);
  }
}
