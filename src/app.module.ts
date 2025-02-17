import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infra/database/database.module';
import { UserModule } from './modules/user/user.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [DatabaseModule, UserModule, NewsletterModule, SubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
