import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createNewsletterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resource_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  utm_source?: string;
  @ApiProperty()
  @IsString()
  utm_medium?: string;
  @ApiProperty()
  @IsString()
  utm_campaign?: string;
  @ApiProperty()
  @IsString()
  utm_channel?: string;
}
