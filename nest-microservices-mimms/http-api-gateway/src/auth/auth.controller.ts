import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { lastValueFrom, Observable } from 'rxjs';
import { IValidateUserResponse } from './interfaces/validate-user.interface';
import { DataLog } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthMicroservices {
  constructor(
    @Inject('NATS_SERVICE') private natsclient: ClientProxy,
    private authSevice: AuthService,
  ) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() userLogin: LoginAuthDto) {
    try {
      const response$: Observable<IValidateUserResponse> =
        this.natsclient.send<IValidateUserResponse>(
          { cmd: 'validateUser' },
          userLogin,
        );

      const payload: IValidateUserResponse = await lastValueFrom(response$);

      if (!payload.status) {
        const message = payload.data?.message ?? 'Error en la validación';
        return { msm: message, success: false };
      }
      const userData: DataLog = {
        id: payload.data?.id ?? 0,
        email: payload.data?.email ?? '',
        name: payload.data?.name ?? '',
      };
      return this.authSevice.loginUser(userData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      return {
        message: 'Error en la comunicación con NATS',
        error: errorMessage,
      };
    }
  }
}
