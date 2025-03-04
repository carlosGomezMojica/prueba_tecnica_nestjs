import { Module } from '@nestjs/common';
import { NastClientModule } from './nast-client/nast-client';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [NastClientModule, UsersModule, AuthModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
