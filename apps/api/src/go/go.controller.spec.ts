import { Test, TestingModule } from '@nestjs/testing';

import { GoController } from './go.controller';
import { GoService } from './go.service';

describe('GoController', () => {
  let controller: GoController;
  let service: GoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoController],
      providers: [
        {
          provide: GoService,
          useValue: {
            handleRedirect: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GoController>(GoController);
    service = module.get<GoService>(GoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw NotFoundException when link not found', async () => {
    const mockReq = { get: jest.fn() } as any;
    const mockRes = { redirect: jest.fn() } as any;

    jest.spyOn(service, 'handleRedirect').mockResolvedValue(null);

    await expect(
      controller.redirect('invalid-code', mockReq, mockRes),
    ).rejects.toThrow('Link not found');
  });
});
