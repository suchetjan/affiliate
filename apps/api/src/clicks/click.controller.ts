import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { ClickService } from './click.service';
import { TrackClickDto } from './dto/track-click.dto';

@Controller('clicks')
export class ClickController {
  constructor(private clickService: ClickService) {}

  @Get()
  findAll() {
    return this.clickService.findAll();
  }

  @Get('link/:linkId')
  findByLink(@Param('linkId') linkId: string) {
    return this.clickService.findByLink(linkId);
  }

  @Post()
  track(@Body() dto: TrackClickDto) {
    return this.clickService.trackClick({
      referrer: dto.referrer,
      user_agent: dto.user_agent,
      link: { id: dto.link_id },
    });
  }
}
