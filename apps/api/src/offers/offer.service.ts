import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer } from './offer.entity';
import { LazadaAdapter } from '../adapters/lazada.adapter';
import { ShopeeAdapter } from '../adapters/shopee.adapter';

@Injectable()
export class OfferService {
  private lazadaAdapter = new LazadaAdapter();
  private shopeeAdapter = new ShopeeAdapter();

  constructor(
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  findAll() {
    return this.offerRepo.find({
      relations: ['product'],
    });
  }

  findByProduct(productId: string) {
    return this.offerRepo.find({
      where: { product: { id: productId } },
      relations: ['product'],
    });
  }

  async create(productId: string, marketplace: string) {
    const adapter =
      marketplace === 'lazada' ? this.lazadaAdapter : this.shopeeAdapter;
    const productData = await adapter.fetchProduct();

    if (!productData) {
      throw new Error(`Product not found on ${marketplace}`);
    }

    const offer = this.offerRepo.create({
      product: { id: productId },
      marketplace,
      store_name: productData.store_name,
      price: productData.price,
      last_checked_at: new Date(),
    });

    return this.offerRepo.save(offer);
  }

  update(id: string, data: Partial<Offer>) {
    return this.offerRepo.update(id, data);
  }

  delete(id: string) {
    return this.offerRepo.delete(id);
  }
}
