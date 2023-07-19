import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDTO, RegisterUserDTO } from '@app/common';

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
