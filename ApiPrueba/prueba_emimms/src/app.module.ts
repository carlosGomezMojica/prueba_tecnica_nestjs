import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    OrderModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
