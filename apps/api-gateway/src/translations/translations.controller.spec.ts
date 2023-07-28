import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsController } from './translations.controller';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateTranslationDTO,
  ReadTranslationDTO,
  UpdateTranslationDTO,
  UserRequest,
} from '@app/common';

describe('TranslationsController', () => {
  let controller: TranslationsController;
  let service: ClientProxy;
  let mockRequest: UserRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [
        {
          provide: 'TRANSLATIONS_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TranslationsController>(TranslationsController);
    service = module.get<ClientProxy>('TRANSLATIONS_SERVICE');
    mockRequest = {
      user: {
        id: 1,
        username: 'test',
        email: 'test@example.com',
      },
    } as UserRequest;
  });

  describe('create', () => {
    it('should call translationsService.send with the correct arguments', async () => {
      const createTranslationDTO: CreateTranslationDTO = {
        set: 'test',
        language: 'english',
        key: 'test translation',
        text: 'Test translation',
      };
      const expectedArgs = [
        { cmd: 'translations.create' },
        createTranslationDTO,
      ];

      await controller.create(mockRequest, createTranslationDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('getAll', () => {
    it('should call translationsService.send with the correct arguments', async () => {
      const getTranslationDTO: ReadTranslationDTO = {
        set: 'test',
        language: 'english',
      };
      const expectedArgs = [{ cmd: 'translations.get-all' }, null];

      await controller.getAll(mockRequest, getTranslationDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('get', () => {
    it('should call translationsService.send with the correct arguments', async () => {
      const translationId = 789;
      const expectedArgs = [{ cmd: 'translations.get', translationId }, null];

      await controller.get(mockRequest, translationId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('update', () => {
    it('should call translationsService.send with the correct arguments', async () => {
      const translationId = 789;
      const updateTranslationDTO: UpdateTranslationDTO = {
        id: translationId,
        set: 'test',
        language: 'english',
        key: 'test translation',
        text: 'Test translation',
      };
      const expectedArgs = [
        { cmd: 'translations.update', translationId },
        updateTranslationDTO,
      ];

      await controller.update(mockRequest, translationId, updateTranslationDTO);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });

  describe('delete', () => {
    it('should call translationsService.send with the correct arguments', async () => {
      const translationId = 789;
      const expectedArgs = [
        { cmd: 'translations.delete', translationId },
        null,
      ];

      await controller.delete(mockRequest, translationId);

      expect(service.send).toHaveBeenCalledWith(...expectedArgs);
    });
  });
});
