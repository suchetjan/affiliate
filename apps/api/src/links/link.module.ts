import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Campaign } from '../campaigns/campaign.entity';
import { ProductModule } from '../products/product.module';
import { CampaignModule } from '../campaigns/campaign.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link, Campaign]),
    ProductModule,
    CampaignModule,
  ],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
