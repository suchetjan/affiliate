import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoService } from './go.service';

@Controller('go')
export class GoController {
  constructor(private readonly goService: GoService) {}

  @Get(':short_code')
  async redirect(
    @Param('short_code') short_code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const targetUrl = await this.goService.handleRedirect(short_code, req);
    if (!targetUrl) {
      throw new NotFoundException('Link not found');
    }

    // redirect to marketplace URL
    return res.redirect(targetUrl);
  }
}
