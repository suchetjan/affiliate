import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../links/link.entity';
import { Click } from '../clicks/click.entity';
import { Request } from 'express';

@Injectable()
export class GoService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,

    @InjectRepository(Click)
    private readonly clickRepo: Repository<Click>,
  ) {}

  async handleRedirect(
    short_code: string,
    req: Request,
  ): Promise<string | null> {
    const link = await this.linkRepo.findOne({
      where: { short_code },
    });

    if (!link) return null;

    // Track click
    const click = this.clickRepo.create({
      link: { id: link.id },
      timestamp: new Date(),
      referrer: req.get('referer') || req.get('referrer') || null,
      user_agent: req.get('user-agent') || null,
    });
    await this.clickRepo.save(click);

    console.log('Click tracked:', {
      referrer: req.get('referer') || req.get('referrer'),
      user_agent: req.get('user-agent'),
      headers: req.headers,
    });

    // Return target_url (already contains UTM parameters)
    return link.target_url;
  }
}
