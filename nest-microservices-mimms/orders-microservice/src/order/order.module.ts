import { Module } from '@nestjs/common';
import { OrderMicroserviceController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NastClientModule } from 'src/nast-client/nast-client';
import { OrderService } from './order.service';

@Module({
  imports: [NastClientModule],
  controllers: [OrderMicroserviceController],
  providers: [PrismaService, OrderService],
})
export class OrderModule {}
