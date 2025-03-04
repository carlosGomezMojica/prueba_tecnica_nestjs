import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatUserName, hashPassword } from './utils/user.utils';
import { compare } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('NATS_SERVICE') private natsclient: ClientProxy,
  ) {}

  async getUser() {
    return await this.prisma.user.findMany();
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
    const user = await this.prisma.user.create({
      data: { name, email, password },
    });
  }

  async validateUser(email: string, password: string) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!userExist)
      return { status: false, data: { message: 'No existe el usuario' } };

    const isPassword = await compare(password, userExist.password);

    if (!isPassword)
      return { status: false, data: { message: 'La contraseña no concide' } };

    return {
      status: true,
      data: {
        sub: userExist.id,
        email: userExist.email,
        name: userExist.name,
      },
    };
  }
}
