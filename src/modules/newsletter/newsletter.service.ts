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
        opened_at: new Date(),
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

      if (!findLastOpening) {
        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: {
            current_streak: 1,
          },
        });
        return;
      }

      const lastOpeningDate = new Date(findLastOpening.opened_at);
      const lastOpeningDay = lastOpeningDate.getDay();
      const currentDate = new Date();
      const currentDay = currentDate.getDay();

      const isConsecutiveDay =
        (lastOpeningDay === 6 && currentDay === 1) ||
        currentDay === lastOpeningDay + 1;

      if (isConsecutiveDay) {
        const updatedCurrent_streak = await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: {
            current_streak: { increment: 1 },
          },
        });

        if (updatedCurrent_streak.current_streak % 6 === 0) {
          await this.prisma.user.update({
            where: { id: newsletter.userId },
            data: {
              level: { increment: 1 },
            },
          });
        }
      } else {
        const user = await this.prisma.user.findUnique({
          where: { id: newsletter.userId },
        });

        if (user.current_streak > user.best_streak) {
          await this.prisma.user.update({
            where: { id: newsletter.userId },
            data: {
              best_streak: user.current_streak,
            },
          });
        }

        await this.prisma.user.update({
          where: { id: newsletter.userId },
          data: {
            current_streak: 1,
          },
        });
      }
    }
  }
}
