import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Campaign } from './campaign.entity';
import { Product } from '../products/product.entity';
import { Offer } from '../offers/offer.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  findAll() {
    return this.campaignRepo.find({
      relations: ['links'],
    });
  }

  async findOne(id: string) {
    const campaign = await this.campaignRepo.findOne({
      where: { id },
    });

    if (!campaign) return null;

    // Get products with links for this campaign
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.offers', 'offers')
      .leftJoinAndSelect('product.links', 'links')
      .where('links.campaign_id = :campaignId', { campaignId: id })
      .getMany();

    return {
      id: campaign.id,
      name: campaign.name,
      utm_campaign: campaign.utm_campaign,
      start_at: campaign.start_at,
      end_at: campaign.end_at,
      products,
    };
  }

  create(data: Partial<Campaign>) {
    const campaign = this.campaignRepo.create(data);
    return this.campaignRepo.save(campaign);
  }

  update(id: string, data: Partial<Campaign>) {
    return this.campaignRepo.update(id, data);
  }

  delete(id: string) {
    return this.campaignRepo.delete(id);
  }

  async getCampaignProducts(campaignId: string) {
    const products = await this.productRepo.find({
      relations: ['offers', 'links'],
      where: { links: { campaign: { id: campaignId } } },
    });

    return products.map((product) => {
      let bestPriceOffer = null;
      if (product.offers && product.offers.length > 0) {
        bestPriceOffer = product.offers.reduce((prev, curr) =>
          curr.price < prev.price ? curr : prev,
        );
      }

      return {
        product,
        offers: product.offers,
        bestPriceOfferId: bestPriceOffer ? bestPriceOffer.id : null,
      };
    });
  }
}
