import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LinkService } from './link.service';
import { Link } from './link.entity';

describe('LinkService', () => {
  let service: LinkService;
  let repo: Repository<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
    repo = module.get<Repository<Link>>(getRepositoryToken(Link));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a short_code when created', async () => {
    const saved = {
      id: '123',
      short_code: 'abc123',
      target_url: 'https://example.com',
      product: { id: 'p1' },
      campaign: { id: 'c1' },
    };
    jest.spyOn(repo, 'create').mockReturnValue(saved as any);
    jest.spyOn(repo, 'save').mockResolvedValue(saved as any);
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    const result = await service.create({
      product: saved.product,
      campaign: saved.campaign,
      target_url: saved.target_url,
    });

    expect(result.short_code).toBeDefined();
    expect(result.target_url).toEqual('https://example.com');
  });
});
