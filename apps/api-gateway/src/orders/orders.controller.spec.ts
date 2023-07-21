import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDTO, UpdateOrderDTO, UserRequest } from '@app/common';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: ClientProxy;
  let mockRequest: UserRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: 'ORDERS_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<ClientProxy>('ORDERS_SERVICE');
    mockRequest = {
      user: {
        id: 1,
        username: 'test',
        email: 'test@example.com',
      },
    } as UserRequest;
  });

  describe('create', () => {
    it('should call ordersService.send with the correct arguments', async () => {
      const createOrderDTO: CreateOrderDTO = {
        userId: 1,
        items: [{ productId: 456, quantity: 2 }],
      };
      const expectedArgs = [{ cmd: 'orders.create' }, createOrderDTO];

      await controller.create(mockRequest, createOrderDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('getAll', () => {
    it('should call ordersService.send with the correct arguments', async () => {
      const expectedArgs = [{ cmd: 'orders.get-all' }, null];

      await controller.getAll(mockRequest);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('get', () => {
    it('should call ordersService.send with the correct arguments', async () => {
      const orderId = 789;
      const expectedArgs = [{ cmd: 'orders.get', orderId }, null];

      await controller.get(mockRequest, orderId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('update', () => {
    it('should call ordersService.send with the correct arguments', async () => {
      const orderId = 789;
      const updateOrderDTO: UpdateOrderDTO = {
        userId: 1,
        id: orderId,
        items: [{ productId: 456, quantity: 2 }],
      };
      const expectedArgs = [{ cmd: 'orders.update', orderId }, updateOrderDTO];

      await controller.update(mockRequest, orderId, updateOrderDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('delete', () => {
    it('should call ordersService.send with the correct arguments', async () => {
      const orderId = 789;
      const expectedArgs = [{ cmd: 'orders.delete', orderId }, null];

      await controller.delete(mockRequest, orderId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });
});
