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
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/order')
export class OrderMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Obtener orden por id de usuario' })
  @Get('/:id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send({ cmd: 'getOrder' }, { id });
  }

  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @ApiOperation({ summary: 'Actualizar el estado del pedido' })
  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateStatusOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const data = {
      id,
      status: updateOrderDto.status,
    };
    return this.natsClient.send({ cmd: 'updateStatusOrder' }, data);
  }
}
