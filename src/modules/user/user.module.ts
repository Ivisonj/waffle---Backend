import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
