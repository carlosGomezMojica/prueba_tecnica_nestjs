import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NastClientModule } from 'src/nast-client/nast-client';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [NastClientModule],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}
