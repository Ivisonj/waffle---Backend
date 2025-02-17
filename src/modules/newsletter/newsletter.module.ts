import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NewsletterController],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
