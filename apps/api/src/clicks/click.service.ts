import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Click } from './click.entity';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(Click)
    private clickRepo: Repository<Click>,
  ) {}

  findAll() {
    return this.clickRepo.find({
      relations: ['link'],
    });
  }

  findByLink(linkId: string) {
    return this.clickRepo.find({
      where: { link: { id: linkId } },
      relations: ['link'],
    });
  }

  trackClick(data: Partial<Click>) {
    const click = this.clickRepo.create(data);
    return this.clickRepo.save(click);
  }
}
