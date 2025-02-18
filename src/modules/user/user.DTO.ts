import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserHeaderDataDTO {
  userId: string;
}

export class CreateUserAccountDTO {
  email: string;
}

export class SignInResponse {
  access_token: string;
  email: string;
  isAdmin: boolean;
}

interface IOpeningHistory {
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
  openingHistory: IOpeningHistory[];
  @ApiProperty()
  messages: string[];
}

export interface IReaders {
  name: string;
  email: string;
  current_streak: number;
}

export class AdminDashboardResponse {
  @ApiProperty()
  totalReaders: number;
  @ApiProperty()
  totalOpenings: number;
  @ApiProperty()
  readers: IReaders[];
}
