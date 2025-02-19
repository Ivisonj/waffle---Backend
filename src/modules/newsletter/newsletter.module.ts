import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
