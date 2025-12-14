import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Click } from '../clicks/click.entity';
import { Link } from '../links/link.entity';
import { Product } from '../products/product.entity';
import { Campaign } from '../campaigns/campaign.entity';
import { Offer } from '../offers/offer.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Click)
    private clickRepo: Repository<Click>,

    @InjectRepository(Link)
    private linkRepo: Repository<Link>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,

    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  async getStats() {
    return {
      clicksByProduct: await this.getClicksByProduct(),
      clicksByCampaign: await this.getClicksByCampaign(),
      topProducts: await this.getTopProducts(),
    };
  }

  // Count clicks per product
  private async getClicksByProduct() {
    return this.clickRepo
      .createQueryBuilder('click')
      .leftJoin('click.link', 'link')
      .leftJoin('link.product', 'product')
      .select('product.id', 'product_id')
      .addSelect('product.title', 'product_title')
      .addSelect('COUNT(click.id)', 'clicks')
      .groupBy('product.id')
      .addGroupBy('product.title')
      .orderBy('clicks', 'DESC')
      .getRawMany();
  }

  // Count clicks per campaign
  private async getClicksByCampaign() {
    return this.clickRepo
      .createQueryBuilder('click')
      .leftJoin('click.link', 'link')
      .leftJoin('link.campaign', 'campaign')
      .select('campaign.id', 'campaign_id')
      .addSelect('campaign.name', 'campaign_name')
      .addSelect('COUNT(click.id)', 'clicks')
      .groupBy('campaign.id')
      .addGroupBy('campaign.name')
      .orderBy('clicks', 'DESC')
      .getRawMany();
  }

  // Top products by clicks
  private async getTopProducts() {
    return this.clickRepo
      .createQueryBuilder('click')
      .leftJoin('click.link', 'link')
      .leftJoin('link.product', 'product')
      .select('product.id', 'product_id')
      .addSelect('product.title', 'product_title')
      .addSelect('COUNT(click.id)', 'clicks')
      .groupBy('product.id')
      .addGroupBy('product.title')
      .orderBy('clicks', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
