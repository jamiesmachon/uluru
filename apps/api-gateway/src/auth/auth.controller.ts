import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDTO, RegisterUserDTO, ValidateUserDTO } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    return this.authService.send(
      {
        cmd: 'auth.register',
      },
      body,
    );
  }

  @Post('validate')
  async validate(@Body() body: ValidateUserDTO) {
    return this.authService.send(
      {
        cmd: 'auth.validate',
      },
      body,
    );
  }

  @Post('login')
  async login(@Body() body: LoginUserDTO) {
    return this.authService.send(
      {
        cmd: 'auth.login',
      },
      body,
    );
  }
}
