import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateUserAccountDTO } from './user.DTO';
import { UserErrors } from './user.errors';

export interface SignInResponse {
  access_token: string;
  email: string;
  isAdmin: boolean;
}

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
      where: { email: email },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
