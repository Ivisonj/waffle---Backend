import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateUserAccountDTO } from './user.DTO';
import { UserErrors } from './user.errors';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserAccountDTO): Promise<void> {
    const findUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    await this.prisma.user.create({
      data: {
        id: uuid(),
        email: user.email,
        isAdmin: false,
      },
    });
  }
}
