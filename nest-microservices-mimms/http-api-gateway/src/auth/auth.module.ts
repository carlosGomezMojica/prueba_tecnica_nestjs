import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwsConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { NastClientModule } from 'src/nast-client/nast-client';
import { AuthService } from './auth.service';
import { AuthMicroservices } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    NastClientModule,
    JwtModule.register({
      secret: jwsConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtStrategy, AuthService, JwtAuthGuard],
  controllers: [AuthMicroservices],
  exports: [AuthService, JwtStrategy, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
