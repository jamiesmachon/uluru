import { Controller, UseGuards, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQService, RegisterUserDTO, LoginUserDTO } from '@app/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject('RabbitMQServiceInterface')
    private readonly rmqService: RabbitMQService,
    @Inject('AuthServiceInterface')
    private readonly authService: AuthService,
  ) {}

  // watch for register new user messages
  @MessagePattern({ cmd: 'auth.register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() newUser: RegisterUserDTO,
  ) {
    this.rmqService.ack(context);

    return this.authService.register(newUser);
  }

  // watch for login request messages
  @MessagePattern({ cmd: 'auth.login' })
  async login(@Ctx() context: RmqContext, @Payload() loginUser: LoginUserDTO) {
    this.rmqService.ack(context);

    return this.authService.login(loginUser);
  }

  @MessagePattern({ cmd: 'auth.verify-jwt' })
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rmqService.ack(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'auth.decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.rmqService.ack(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }
}
