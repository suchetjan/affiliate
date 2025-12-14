import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  utm_campaign: string;

  @IsOptional()
  @Type(() => Date)
  start_at?: Date;

  @IsOptional()
  @Type(() => Date)
  end_at?: Date;
}
