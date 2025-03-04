import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Obtener orden por id de usuario' })
  @Get('/:id')
  getOrdes(@Param('id') id: string) {
    return this.orderService.getOrder(parseInt(id));
  }

  @ApiOperation({ summary: 'Crea un nuevo pedido' })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(
      createOrderDto.description,
      createOrderDto.userId,
    );
  }

  @ApiOperation({ summary: 'Actualiza el status del pedido' })
  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  async updateStatusOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateStatusOrder(
      parseInt(id),
      updateOrderDto.status,
    );
  }
}
