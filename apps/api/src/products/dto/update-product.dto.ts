import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;
}
