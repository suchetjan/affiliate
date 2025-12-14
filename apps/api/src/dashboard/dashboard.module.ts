import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Click } from '../clicks/click.entity';
import { Link } from '../links/link.entity';
import { Product } from '../products/product.entity';
import { Campaign } from '../campaigns/campaign.entity';
import { Offer } from '../offers/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Click, Link, Product, Campaign, Offer])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
