import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { Offer } from '../offers/offer.entity';
import { LazadaAdapter } from '../adapters/lazada.adapter';
import { ShopeeAdapter } from '../adapters/shopee.adapter';

@Injectable()
export class ProductService {
  private lazadaAdapter = new LazadaAdapter();
  private shopeeAdapter = new ShopeeAdapter();

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['offers'],
    });
  }

  findOne(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['offers'],
    });
  }

  async createWithOffers(productData: {
    title: string;
    image_url: string;
    offers: Array<{ platform: string; url: string }>;
  }) {
    // Create product
    const product = this.productRepo.create({
      title: productData.title,
      image_url: productData.image_url,
    });
    const savedProduct = await this.productRepo.save(product);

    // Create offers from URLs
    const offers = [];
    for (const offerData of productData.offers) {
      const adapter =
        offerData.platform === 'lazada'
          ? this.lazadaAdapter
          : this.shopeeAdapter;
      const marketplaceData = await adapter.fetchProduct();

      if (marketplaceData) {
        offers.push(
          this.offerRepo.create({
            product: { id: savedProduct.id },
            marketplace: offerData.platform,
            store_name: marketplaceData.store_name,
            price: marketplaceData.price,
            last_checked_at: new Date(),
          }),
        );
      }
    }

    if (offers.length > 0) {
      await this.offerRepo.save(offers);
    }

    return this.findOne(savedProduct.id);
  }

  private extractSku(url: string): string {
    // Extract SKU from URL - for demo, use different SKUs
    if (url.includes('lazada')) return 'laz-sku123';
    if (url.includes('shopee')) return 'sho-sku123';
    return 'sku123'; // Default
  }

  create(data: any) {
    if (data.offers) {
      return this.createWithOffers(data);
    }
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  update(id: string, data: Partial<Product>) {
    return this.productRepo.update(id, data);
  }

  delete(id: string) {
    return this.productRepo.delete(id);
  }
}
