import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getOrder(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async createOrder(description: string, user: number) {
    return this.prisma.order.create({
      data: {
        description: description,
        userId: user,
      },
    });
  }

  async updateStatusOrder(id: number, status: string) {
    const updateOrder = await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return updateOrder;
  }
}
