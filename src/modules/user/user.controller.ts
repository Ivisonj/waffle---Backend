import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  @Get('admin/users/period/:period')
  async getUsersByPeriod(
    @Req() headerData: UserHeaderDataDTO,
    @Param('period') paramData: 'week' | 'month' | 'year',
  ) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.getUsersByPeriod(userId, paramData);
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
  @Get('admin/users/activity-status/:status')
  async usersByActivityStatus(
    @Req() headerData: UserHeaderDataDTO,
    @Param('status') paramData: 'all' | 'active' | 'inactive',
  ) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.getUsersByActivityStatus(userId, paramData);
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
  @Get('admin/ranking')
  async readersRanking(@Req() headerData: UserHeaderDataDTO) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.readersRanking(userId);
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
  @Get('admin/dashboard/time-serie/:period')
  async timeSerie(
    @Req() headerData: UserHeaderDataDTO,
    @Param('period') paramData: 'week' | 'month',
  ) {
    try {
      const userId = headerData.userId;
      const data = await this.repo.getTimeSerie(userId, paramData);
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
