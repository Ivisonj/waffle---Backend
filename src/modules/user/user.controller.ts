import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserErrors } from './user.errors';
import { CreateUserAccountDTO, UserHeaderDataDTO } from './user.DTO';
import { AuthGuard } from './auth.guard';

@Controller('api/v1/')
export class UserController {
  constructor(private readonly repo: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('user/signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.repo.signIn(signInDto.email);
  }

  @UseGuards(AuthGuard)
  @Get('user/dashboard')
  async userDashboard(@Req() headerData: UserHeaderDataDTO) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.getUserDashboard(userId);
      return data;
    } catch (error) {
      if (error.message === UserErrors) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    }
  }
  @UseGuards(AuthGuard)
  @Get('admin/dashboard')
  async adminDashboard(@Req() headerData: UserHeaderDataDTO) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.getAdminDashboard(userId);
      return data;
    } catch (error) {
      if (error.message === UserErrors) {
        throw new ConflictException(error);
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
