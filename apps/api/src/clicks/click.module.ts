import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Click } from './click.entity';
import { ClickService } from './click.service';
import { ClickController } from './click.controller';
import { LinkModule } from '../links/link.module';

@Module({
  imports: [TypeOrmModule.forFeature([Click]), LinkModule],
  controllers: [ClickController],
  providers: [ClickService],
})
export class ClickModule {}
