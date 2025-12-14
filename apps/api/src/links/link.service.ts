import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import { Link } from './link.entity';
import { Campaign } from '../campaigns/campaign.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepo: Repository<Link>,
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
  ) {}

  findAll() {
    return this.linkRepo.find({
      relations: ['product', 'campaign'],
    });
  }

  findOne(id: string) {
    return this.linkRepo.findOne({
      where: { id },
      relations: ['product', 'campaign'],
    });
  }

  findByShortCode(code: string) {
    return this.linkRepo.findOne({
      where: { short_code: code },
      relations: ['product', 'campaign'],
    });
  }

  async create(data: {
    product: { id: string };
    campaign: { id: string };
    target_url: string;
  }) {
    let code: string;
    do {
      code = nanoid(6);
    } while (await this.linkRepo.findOne({ where: { short_code: code } }));

    // Get campaign for UTM parameters
    const campaign = await this.campaignRepo.findOne({
      where: { id: data.campaign.id },
    });

    let finalUrl = data.target_url;
    if (campaign) {
      try {
        const url = new URL(data.target_url);
        if (campaign.utm_campaign)
          url.searchParams.set('utm_campaign', campaign.utm_campaign);
        finalUrl = url.toString();
      } catch {
        // If URL parsing fails, use original URL
        console.error('Invalid URL:', data.target_url);
        finalUrl = data.target_url;
      }
    }

    const link = this.linkRepo.create({
      product: data.product,
      campaign: data.campaign,
      short_code: code,
      target_url: finalUrl,
    });

    return this.linkRepo.save(link);
  }

  delete(id: string) {
    return this.linkRepo.delete(id);
  }
}
