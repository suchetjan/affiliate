import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';

import { OfferService } from './offer.service';
import { PriceRefreshService } from './price-refresh.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OfferController {
  constructor(
    private offerService: OfferService,
    private priceRefreshService: PriceRefreshService,
  ) {}

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.offerService.findByProduct(productId);
  }

  @Post()
  create(@Body() dto: CreateOfferDto) {
    return this.offerService.create(dto.product_id, dto.marketplace);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
    return this.offerService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.offerService.delete(id);
  }

  @Post('refresh-prices')
  refreshPrices() {
    return this.priceRefreshService.performPriceRefresh();
  }
}
