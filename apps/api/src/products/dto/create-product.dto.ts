import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class OfferDto {
  @IsString()
  @IsIn(['lazada', 'shopee'])
  platform: string;

  @IsUrl()
  url: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  image_url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferDto)
  offers: OfferDto[];
}
