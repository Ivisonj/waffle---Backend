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

  @Post()
  async createUser(@Body(new ValidationPipe()) user: CreateUserAccountDTO) {
    try {
      await this.repo.create(user);
      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      if (error.message === UserErrors) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
