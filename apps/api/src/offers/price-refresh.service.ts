import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer } from './offer.entity';
import { LazadaAdapter } from '../adapters/lazada.adapter';
import { ShopeeAdapter } from '../adapters/shopee.adapter';

@Injectable()
export class PriceRefreshService {
  private readonly logger = new Logger(PriceRefreshService.name);
  private readonly lazadaAdapter = new LazadaAdapter();
  private readonly shopeeAdapter = new ShopeeAdapter();

  constructor(
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async refreshPrices() {
    return this.performPriceRefresh();
  }

  async performPriceRefresh() {
    this.logger.log('Starting price refresh job');

    const offers = await this.offerRepo.find({
      relations: ['product'],
    });

    let updated = 0;

    for (const offer of offers) {
      try {
        const adapter =
          offer.marketplace === 'lazada'
            ? this.lazadaAdapter
            : this.shopeeAdapter;
        const productData = await adapter.fetchProduct();

        if (productData && productData.price !== offer.price) {
          await this.offerRepo.update(offer.id, {
            price: productData.price,
            store_name: productData.store_name,
            last_checked_at: new Date(),
          });
          updated++;
          this.logger.log(
            `Updated price for ${offer.marketplace} offer ${offer.id}: ${offer.price} -> ${productData.price}`,
          );
        } else {
          await this.offerRepo.update(offer.id, {
            last_checked_at: new Date(),
          });
        }
      } catch (error) {
        this.logger.error(
          `Failed to refresh price for offer ${offer.id}:`,
          error,
        );
      }
    }

    this.logger.log(
      `Price refresh completed. Updated ${updated} of ${offers.length} offers`,
    );
  }
}
