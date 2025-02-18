import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserHeaderDataDTO {
  userId: string;
}

export class CreateUserAccountDTO {
  email: string;
}

interface OpeningHistoryTypes {
  id: string;
  resource_id: string;
  opened_at: Date;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_channel: string;
}

export class UserDashboardResponse {
  @ApiProperty()
  current_streak: number;
  @ApiProperty()
  best_streak: number;
  @ApiProperty()
  level: number;
  @ApiProperty()
  openingHistory: OpeningHistoryTypes[];
  @ApiProperty()
  messages: string[];
}
