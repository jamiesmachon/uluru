import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDTO, LoginUserDTO } from '@app/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<ClientProxy>('AUTH_SERVICE');
  });

  describe('register', () => {
    it('should call authService.send with the correct arguments', async () => {
      const registerUserDTO: RegisterUserDTO = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedArgs = [{ cmd: 'auth.register' }, registerUserDTO];

      await controller.register(registerUserDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('login', () => {
    it('should call authService.send with the correct arguments', async () => {
      const loginUserDTO: LoginUserDTO = {
        username: 'test',
        password: 'password',
      };
      const expectedArgs = [{ cmd: 'auth.login' }, loginUserDTO];

      await controller.login(loginUserDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });
});
