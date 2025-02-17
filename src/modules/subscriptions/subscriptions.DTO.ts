import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resource_id: string;
  @ApiProperty()
  utm_source?: string;
  @ApiProperty()
  utm_medium?: string;
  @ApiProperty()
  utm_campaign?: string;
  @ApiProperty()
  utm_channel?: string;
}
