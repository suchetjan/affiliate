import { IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsUUID()
  campaign_id: string;

  @IsNotEmpty()
  @IsUrl()
  target_url: string;
}
