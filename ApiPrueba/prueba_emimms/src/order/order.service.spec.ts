import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, PrismaService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get orders for a user', async () => {
    jest.spyOn(prisma.order, 'findMany').mockResolvedValue([]);
    await expect(service.getOrder(1)).resolves.toEqual([]);
  });

  it('should create an order', async () => {
    const mockOrder: Order = {
      id: 1,
      description: 'Test Order',
      userId: 1,
      status: 'PENDIENTE',
    };
    jest.spyOn(prisma.order, 'create').mockResolvedValue(mockOrder);
    await expect(service.createOrder('Test Order', 1)).resolves.toEqual(
      mockOrder,
    );
  });

  it('should update order status', async () => {
    const mockOrder: Order = {
      id: 1,
      status: 'EN_PROCESO',
      description: '',
      userId: 1,
    };
    jest.spyOn(prisma.order, 'update').mockResolvedValue(mockOrder);
    await expect(service.updateStatusOrder(1, 'Updated')).resolves.toEqual(
      mockOrder,
    );
  });
});
