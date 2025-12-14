import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Campaign } from './campaign.entity';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Product } from '../products/product.entity';
import { Offer } from '../offers/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Product, Offer])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
