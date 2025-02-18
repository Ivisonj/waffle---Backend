import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { createNewsletterDTO } from './newsletter.DTO';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewsletter(newsletter: createNewsletterDTO) {
    const createNewsletter = await this.prisma.newsletters.create({
      data: {
        id: uuid(),
        resource_id: newsletter.resource_id,
        userId: newsletter.userId,
        opened_at: new Date('2025-02-13'),
        utm_source: newsletter.utm_source,
        utm_medium: newsletter.utm_medium,
        utm_campaign: newsletter.utm_campaign,
        utm_channel: newsletter.utm_channel,
      },
    });

    if (createNewsletter) {
      const findLastOpening = await this.prisma.newsletters.findFirst({
        where: {
          userId: newsletter.userId,
          id: { not: createNewsletter.id },
        },
        select: {
          opened_at: true,
        },
        orderBy: {
          opened_at: 'desc',
        },
      });

      const lastOpening = new Date(findLastOpening.opened_at);
      const lastDay = lastOpening.getDay() + 1;
      console.log('lastDay', lastDay);
      const currentDate = new Date();
      const currentDay = currentDate.getDay() + 1;
      console.log('currentDay', currentDay);

      const isConsecutiveDay = lastDay + 1 === currentDay;

      if (isConsecutiveDay) {
        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: {
            current_streak: { increment: 1 },
          },
        });
      }
      if (!isConsecutiveDay) {
        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: {
            current_streak: 0,
          },
        });
      }
    }
  }
}
