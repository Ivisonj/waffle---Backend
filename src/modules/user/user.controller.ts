import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserErrors } from './user.errors';
import { CreateUserAccountDTO } from './user.DTO';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly repo: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.repo.signIn(signInDto.email);
  }
}
