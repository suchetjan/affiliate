import { IsUUID, IsOptional, IsString } from 'class-validator';

export class TrackClickDto {
  @IsUUID()
  link_id: string;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsOptional()
  @IsString()
  user_agent?: string;
}
