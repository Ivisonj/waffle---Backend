import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('api/v1/newsletter')
export class NewsletterController {
  constructor(private readonly repo: NewsletterService) {}
}
