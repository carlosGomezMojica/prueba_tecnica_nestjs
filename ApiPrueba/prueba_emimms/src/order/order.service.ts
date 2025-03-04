import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrder(userId: number) {
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

  async updateStatusOrder(id: number, status: string): Promise<Order> {
    return await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}
