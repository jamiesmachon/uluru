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

  @MessagePattern({ cmd: 'assets.upload' })
  async uploadFile(@Ctx() context: RmqContext, @Payload() file) {
    // this.rmqService.ack(context);

    // Process the file buffer here
    console.log('Received file:', file);
    // upload the file to a storage location
    //const newFile = '';

    // create a record in the database for that new asset
    // return this.assetsService.create(newFile);
  }
}
