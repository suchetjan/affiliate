import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Offer } from '../offers/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Offer])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], // if other modules need it
})
export class ProductModule {}
