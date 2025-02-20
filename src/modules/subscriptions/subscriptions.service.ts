import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { UserService } from '../user/user.service';
import { NewsletterService } from '../newsletter/newsletter.service';
import { CreateSubscriptionDTO } from './subscriptions.DTO';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly newsletterService: NewsletterService,
  ) {}

  async subscriptions(query: { email: string; id: string }): Promise<void> {
    console.log('query', query);
  }
}

// @Injectable()
// export class SubscriptionsService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly userService: UserService,
//     private readonly newsletterService: NewsletterService,
//   ) {}

//   async subscriptions(data: CreateSubscriptionDTO): Promise<void> {
//     let user = await this.prisma.user.findUnique({
//       where: { email: data.email },
//     });

//     if (!user) {
//       user = await this.userService.createUser({ email: data.email });
//     }

//     await this.newsletterService.createNewsletter({
//       resource_id: data.resource_id,
//       userId: user.id,
//       title: data.title,
//       utm_source: data.utm_source,
//       utm_medium: data.utm_medium,
//       utm_campaign: data.utm_campaign,
//       utm_channel: data.utm_channel,
//     });
//   }
// }
