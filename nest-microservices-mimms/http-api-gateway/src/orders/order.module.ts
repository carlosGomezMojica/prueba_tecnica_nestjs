import { Module } from '@nestjs/common';
import { OrderMicroserviceController } from './order.controller';
import { NastClientModule } from 'src/nast-client/nast-client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [NastClientModule, AuthModule],
  controllers: [OrderMicroserviceController],
})
export class OrderModule {}
