import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { UserModule } from '../user/user.module';
import { NewsletterModule } from '../newsletter/newsletter.module';

@Module({
  imports: [DatabaseModule, UserModule, NewsletterModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
