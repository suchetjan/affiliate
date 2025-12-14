import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('api/links')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLinkDto) {
    // map DTO to relation stubs
    return this.linkService.create({
      product: { id: dto.product_id },
      campaign: { id: dto.campaign_id },
      target_url: dto.target_url,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.linkService.delete(id);
  }
}
