import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from './offer.entity';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PriceRefreshService } from './price-refresh.service';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), ProductModule],
  controllers: [OfferController],
  providers: [OfferService, PriceRefreshService],
})
export class OfferModule {}
