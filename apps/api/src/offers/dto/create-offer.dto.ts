import { IsString, IsUUID, IsIn, IsNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @IsUUID()
  product_id: string;

  @IsString()
  @IsIn(['lazada', 'shopee'])
  marketplace: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
