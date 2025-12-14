import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoController } from './go.controller';
import { GoService } from './go.service';
import { Link } from '../links/link.entity';
import { Click } from '../clicks/click.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link, Click])],
  controllers: [GoController],
  providers: [GoService],
})
export class GoModule {}
