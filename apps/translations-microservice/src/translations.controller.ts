import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  RabbitMQService,
  CreateTranslationDTO,
  UpdateTranslationDTO,
} from '@app/common';
import { TranslationsService } from './translations.service';

@Controller()
export class TranslationsController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('TranslationsServiceInterface')
    private readonly translationsService: TranslationsService,
  ) {}

  @MessagePattern({ cmd: 'translations.get-all' })
  async getTranslations(@Ctx() context: RmqContext, @Payload() where: object) {
    this.rmqService.ack(context);

    return this.translationsService.getAll(where);
  }

  @MessagePattern({ cmd: 'translations.get' })
  async getTranslation(
    @Ctx() context: RmqContext,
    @Payload() translation: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.translationsService.getBy({ id: translation.id });
  }

  @MessagePattern({ cmd: 'translations.create' })
  async createTranslation(
    @Ctx() context: RmqContext,
    @Payload() newTranslation: CreateTranslationDTO,
  ) {
    this.rmqService.ack(context);

    return this.translationsService.create(newTranslation);
  }

  @MessagePattern({ cmd: 'translations.update' })
  async updateTranslation(
    @Ctx() context: RmqContext,
    @Payload() updateTranslation: UpdateTranslationDTO,
  ) {
    this.rmqService.ack(context);

    return this.translationsService.update(
      updateTranslation.id,
      updateTranslation,
    );
  }

  @MessagePattern({ cmd: 'translations.delete' })
  async deleteTranslation(
    @Ctx() context: RmqContext,
    @Payload() translation: { id: number },
  ) {
    this.rmqService.ack(context);

    return this.translationsService.delete(translation.id);
  }
}
