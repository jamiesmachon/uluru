import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO, UpdateUserDTO, UserRequest } from '@app/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: ClientProxy;
  let mockRequest: UserRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'USERS_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<ClientProxy>('USERS_SERVICE');
    mockRequest = {
      user: {
        id: 1,
        username: 'test',
        email: 'test@example.com',
      },
    } as UserRequest;
  });

  describe('create', () => {
    it('should call usersService.send with the correct arguments', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password',
        username: 'test',
        salt: 'salt',
      };
      const expectedArgs = [{ cmd: 'users.create' }, createUserDTO];

      await controller.create(mockRequest, createUserDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('getAll', () => {
    it('should call usersService.send with the correct arguments', async () => {
      const expectedArgs = [{ cmd: 'users.get-all' }, null];

      await controller.getAll(mockRequest);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('get', () => {
    it('should call usersService.send with the correct arguments', async () => {
      const userId = 789;
      const expectedArgs = [{ cmd: 'users.get', userId }, null];

      await controller.get(mockRequest, userId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('update', () => {
    it('should call usersService.send with the correct arguments', async () => {
      const userId = 789;
      const updateUserDTO: UpdateUserDTO = {
        id: userId,
        email: 'test@example.com',
        password: 'password',
        username: 'test',
        salt: 'salt',
      };
      const expectedArgs = [{ cmd: 'users.update', userId }, updateUserDTO];

      await controller.update(mockRequest, userId, updateUserDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('delete', () => {
    it('should call usersService.send with the correct arguments', async () => {
      const userId = 789;
      const expectedArgs = [{ cmd: 'users.delete', userId }, null];

      await controller.delete(mockRequest, userId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });
});
