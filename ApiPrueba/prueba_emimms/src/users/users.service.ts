import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { formatUserName, hashPassword } from './utils/user.utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    return this.prisma.user.findMany();
  }

  async getUserLog(id: number, name: string, email: string) {
    const order = await this.prisma.order.findMany({ where: { userId: id } });
    return {
      orders: order,
      user: {
        id: id,
        name: name,
        email: email,
      },
    };
  }

  async createUser(name: string, email: string, password: string) {
    password = hashPassword(password);
    name = formatUserName(name);
    const newUser = this.prisma.user.create({
      data: { name, email, password },
    });

    return newUser;
  }
}
