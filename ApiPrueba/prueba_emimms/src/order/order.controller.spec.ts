import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderDto } from './dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getOrder: jest.fn().mockResolvedValue([]),
            createOrder: jest.fn().mockResolvedValue({
              id: 1,
              description: 'Test Order',
              userId: 1,
            }),
            updateStatusOrder: jest
              .fn()
              .mockResolvedValue({ id: 1, status: OrderStatus.COMPLETADO }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get orders by user id', async () => {
    await expect(controller.getOrdes('1')).resolves.toEqual([]);
  });

  it('should create an order', async () => {
    const dto: CreateOrderDto = { description: 'Test Order', userId: 1 };
    await expect(controller.createOrder(dto)).resolves.toEqual({
      id: 1,
      description: 'Test Order',
      userId: 1,
    });
  });

  it('should update order status', async () => {
    const dto: UpdateOrderDto = { status: OrderStatus.COMPLETADO };
    await expect(controller.updateStatusOrder('1', dto)).resolves.toEqual({
      id: 1,
      status: OrderStatus.COMPLETADO,
    });
  });
});
