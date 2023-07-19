import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface RabbitMQServiceInterface {
  getOptions(queue: string): RmqOptions;
  ack(context: RmqContext): void;
}
