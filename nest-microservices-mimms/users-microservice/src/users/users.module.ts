import { Module } from '@nestjs/common';
import { UserMicroserviceController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { NastClientModule } from 'src/nast-client/nast-client';

@Module({
  imports: [NastClientModule],
  controllers: [UserMicroserviceController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
