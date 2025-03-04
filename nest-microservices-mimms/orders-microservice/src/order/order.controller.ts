import { Controller, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrderMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsclient: ClientProxy,
    private orderService: OrderService,
  ) {}

  @MessagePattern({ cmd: 'createOrder' })
  createOrder(@Payload() data: CreateOrderDto) {
    return this.orderService.createOrder(data.description, data.userId);
  }

  @MessagePattern({ cmd: 'getOrders' })
  getOrders(@Payload() data: string) {
    return this.orderService.getOrder(parseInt(data));
  }

  @MessagePattern({ cmd: 'updateStatusOrder' })
  updateStatusOrder(@Payload() data: UpdateOrderDto) {
    const newOrder = this.orderService.createOrder(data.status, data.id);
    if (newOrder) this.natsclient.emit('orderCreated', newOrder);
  }
}
