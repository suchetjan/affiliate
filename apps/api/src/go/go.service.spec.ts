import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoService } from './go.service';
import { Link } from '../links/link.entity';
import { Click } from '../clicks/click.entity';

describe('GoService', () => {
  let service: GoService;
  let linkRepo: Repository<Link>;
  let clickRepo: Repository<Click>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoService,
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Click),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GoService>(GoService);
    linkRepo = module.get(getRepositoryToken(Link));
    clickRepo = module.get(getRepositoryToken(Click));
  });

  it('should return null for unknown short_code', async () => {
    const mockReq = {
      get: jest.fn().mockReturnValue(null),
    } as any;

    jest.spyOn(linkRepo, 'findOne').mockResolvedValue(null);
    expect(await service.handleRedirect('xyz', mockReq)).toBeNull();
  });

  it('should return a URL when link exists', async () => {
    const link = {
      id: 'l1',
      target_url: 'https://example.com',
      campaign: null,
    } as any;

    const mockReq = {
      get: jest.fn().mockReturnValue(null),
    } as any;

    jest.spyOn(linkRepo, 'findOne').mockResolvedValue(link);
    jest.spyOn(clickRepo, 'create').mockReturnValue({} as any);
    jest.spyOn(clickRepo, 'save').mockResolvedValue({} as any);

    const result = await service.handleRedirect('abc123', mockReq);
    expect(result).toContain('https://example.com');
  });
});
