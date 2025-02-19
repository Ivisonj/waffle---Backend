import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { createNewsletterDTO } from './newsletter.DTO';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewsletter(newsletter: createNewsletterDTO) {
    let findNewsletter = await this.prisma.newsletters.findUnique({
      where: { resource_id: newsletter.resource_id },
    });

    if (!findNewsletter) {
      findNewsletter = await this.prisma.newsletters.create({
        data: {
          id: uuid(),
          resource_id: newsletter.resource_id,
          title: newsletter.title,
        },
      });
    }

    const openEvent = await this.prisma.open_Events.create({
      data: {
        id: uuid(),
        newsletter_id: newsletter.resource_id,
        userId: newsletter.userId,
        opened_at: new Date(),
        utm_source: newsletter.utm_source,
        utm_medium: newsletter.utm_medium,
        utm_campaign: newsletter.utm_campaign,
        utm_channel: newsletter.utm_channel,
      },
    });

    if (openEvent) {
      const lastOpenEvent = await this.prisma.open_Events.findFirst({
        where: {
          userId: newsletter.userId,
          id: { not: openEvent.id },
        },
        select: { opened_at: true },
        orderBy: { opened_at: 'desc' },
      });

      if (!lastOpenEvent) {
        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: { current_streak: 1 },
        });
        return;
      }

      const lastOpeningDate = new Date(lastOpenEvent.opened_at);
      const currentDate = new Date();

      const lastOpeningDay = lastOpeningDate.getDay();
      const currentDay = currentDate.getDay();

      const isConsecutiveDay =
        (lastOpeningDay === 6 && currentDay === 1) ||
        currentDay === lastOpeningDay + 1;

      if (isConsecutiveDay) {
        const updatedUser = await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: { current_streak: { increment: 1 } },
        });

        if (updatedUser.current_streak % 6 === 0) {
          await this.prisma.user.update({
            where: { id: newsletter.userId },
            data: { level: { increment: 1 } },
          });
        }
      } else {
        const user = await this.prisma.user.findUnique({
          where: { id: newsletter.userId },
        });

        if (user.current_streak > user.best_streak) {
          await this.prisma.user.update({
            where: { id: newsletter.userId },
            data: { best_streak: user.current_streak },
          });
        }

        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: { current_streak: 1 },
        });
      }
    }
  }
}
