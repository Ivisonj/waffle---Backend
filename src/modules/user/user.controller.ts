import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserErrors } from './user.errors';
import { CreateUserAccountDTO } from './user.DTO';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly repo: UserService) {}
}
