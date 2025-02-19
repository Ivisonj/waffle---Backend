import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDTO } from './subscriptions.DTO';
import { SubscriptionsErrors } from './subscriptions.errors';

@Controller('api/v1/webhook')
export class SubscriptionsController {
  constructor(private readonly repo: SubscriptionsService) {}

  @Post()
  async webhook(@Body() data: any) {
    try {
      console.log('data:', data);
      await this.repo.subscriptions(data);
      return { message: 'Sucesso!' };
    } catch (error) {
      if (error.message === SubscriptionsErrors) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
