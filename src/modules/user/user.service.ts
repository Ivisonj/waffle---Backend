import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import {
  CreateUserAccountDTO,
  ReadersRankingResponse,
  TimeSerieResponse,
  UsersMetricReponse,
} from './user.DTO';
import { UserDashboardResponse, SignInResponse } from './user.DTO';
import { MessageResponse } from './user.messageResponse';
import { UserErrors } from './user.errors';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserAccountDTO) {
    const newUser = await this.prisma.user.create({
      data: {
        id: uuid(),
        email: user.email,
        isAdmin: false,
        current_streak: 1,
        best_streak: 1,
        level: 1,
      },
    });

    return newUser;
  }

  async signIn(email: string): Promise<SignInResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }

  async getUserDashboard(userId: string): Promise<UserDashboardResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (userId !== user.id) {
      throw new UserErrors.Unauthorized();
    }

    const openEvents = await this.prisma.open_Events.findMany({
      where: { userId },
      include: { newsletter: true },
    });

    return {
      current_streak: user.current_streak,
      best_streak: user.best_streak,
      level: user.level,
      openingHistory: openEvents.map((event) => ({
        id: event.id,
        resource_id: event.newsletter.resource_id,
        opened_at: event.opened_at,
        utm_source: event.utm_source,
        utm_medium: event.utm_medium,
        utm_campaign: event.utm_campaign,
        utm_channel: event.utm_channel,
      })),
      messages: [
        new MessageResponse(user.current_streak).getCurrentStreakMessage(),
        new MessageResponse(user.best_streak).getBestStreakMessage(),
        new MessageResponse(user.level).getLevelMessage(),
      ],
    };
  }

  async getUsersByPeriod(
    userId: string,
    period: 'week' | 'month' | 'year',
  ): Promise<UsersMetricReponse> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userId, isAdmin: true },
    });

    if (userId !== adminUser.id) {
      throw new UserErrors.Unauthorized();
    }

    const today = new Date();
    let startDate: Date;

    if (period === 'year') {
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
    } else if (period === 'month') {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
    } else if (period === 'week') {
      const dayOfWeek = today.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - diff);
      startDate.setHours(0, 0, 0, 0);
    }

    const users = await this.prisma.user.findMany({
      where: {
        created_at: {
          gte: startDate,
          lte: today,
        },
      },
    });

    return { totalReaders: users.length };
  }

  async getUsersByActivityStatus(
    userId: string,
    status: 'all' | 'active' | 'inactive',
  ): Promise<UsersMetricReponse> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userId, isAdmin: true },
    });

    if (userId !== adminUser.id) {
      throw new UserErrors.Unauthorized();
    }

    if (status === 'all') {
      const users = await this.prisma.user.findMany({});
      return { totalReaders: users.length };
    } else if (status === 'active') {
      const activeUsers = await this.prisma.user.findMany({
        where: { current_streak: { gt: 1 } },
      });
      return { totalReaders: activeUsers.length };
    } else {
      const inactiveUsers = await this.prisma.user.findMany({
        where: { current_streak: 1 },
      });
      return { totalReaders: inactiveUsers.length };
    }
  }

  async getUsersByNewsletter(
    userId: string,
    resource_id: string,
  ): Promise<UsersMetricReponse> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userId, isAdmin: true },
    });

    if (userId !== adminUser.id) {
      throw new UserErrors.Unauthorized();
    }

    const newsletterOpens = await this.prisma.open_Events.findMany({
      where: { newsletter: { resource_id } },
    });

    const uniqueUsers = Array.from(
      new Set(newsletterOpens.map((event) => event.userId)),
    );

    return { totalReaders: uniqueUsers.length };
  }

  async readersRanking(userId: string): Promise<ReadersRankingResponse> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userId, isAdmin: true },
    });

    if (userId !== adminUser.id) {
      throw new UserErrors.Unauthorized();
    }

    const users = await this.prisma.user.findMany({
      orderBy: { current_streak: 'desc' },
    });

    return {
      readers: users.map((u) => ({
        name: u.name,
        email: u.email,
        current_streak: u.current_streak,
      })),
    };
  }

  async getTimeSerie(
    userId: string,
    period: 'week' | 'month',
  ): Promise<TimeSerieResponse[]> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userId, isAdmin: true },
    });

    if (userId !== adminUser.id) {
      throw new UserErrors.Unauthorized();
    }

    const today = new Date();
    let startDate: Date;

    if (period === 'month') {
      startDate = new Date(2025, 0, 1);
    } else if (period === 'week') {
      const dayOfWeek = today.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - diff);
      startDate.setHours(0, 0, 0, 0);
    }

    const openEvents = await this.prisma.open_Events.findMany({
      where: {
        opened_at: {
          gte: startDate,
          lte: today,
        },
      },
    });

    if (period === 'month') {
      const months = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
      const grouped: Record<string, number> = {};

      openEvents.forEach((event) => {
        const monthIndex = event.opened_at.getMonth();
        const monthLabel = months[monthIndex];
        grouped[monthLabel] = (grouped[monthLabel] || 0) + 1;
      });

      const result = Object.entries(grouped)
        .map(([label, total]) => ({ label, total }))
        .sort((a, b) => months.indexOf(a.label) - months.indexOf(b.label));

      return result;
    }

    if (period === 'week') {
      const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
      const grouped: Record<string, number> = {};

      openEvents.forEach((event) => {
        const day = event.opened_at.getDay();
        const dayLabel = day === 0 ? 'Dom' : weekDays[day - 1];
        grouped[dayLabel] = (grouped[dayLabel] || 0) + 1;
      });

      const result = Object.entries(grouped)
        .map(([label, total]) => ({ label, total }))
        .sort((a, b) => weekDays.indexOf(a.label) - weekDays.indexOf(b.label));

      return result;
    }

    return [];
  }
}
