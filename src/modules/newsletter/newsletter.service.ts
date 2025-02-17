import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { createNewsletterDTO } from './newsletter.DTO';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewsletter(newsletter: createNewsletterDTO) {
    await this.prisma.newsletters.create({
      data: {
        id: uuid(),
        resource_id: newsletter.resource_id,
        userId: newsletter.userId,
        opened_at: new Date(),
        utm_source: newsletter.utm_source,
        utm_medium: newsletter.utm_medium,
        utm_campaign: newsletter.utm_campaign,
        utm_channel: newsletter.utm_channel,
      },
    });
  }
}
