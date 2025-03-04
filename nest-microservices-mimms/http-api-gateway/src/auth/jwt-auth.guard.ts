import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los datos enviados a través de NATS con tipado correcto
    const data: AuthPayload = context.switchToRpc().getData();

    // Validar que el token existe antes de intentar acceder a él
    if (
      !data ||
      typeof data !== 'object' ||
      !('token' in data) ||
      typeof data.token !== 'string'
    ) {
      throw new RpcException(new UnauthorizedException('Token no encontrado'));
    }

    try {
      // Verificamos y decodificamos el token con tipado correcto
      const decoded: JwtPayload = this.jwtService.verify<JwtPayload>(
        data.token,
      );

      // Validamos que `getContext()` sea un objeto antes de asignar `user`
      const rpcContext: Record<string, unknown> = context
        .switchToRpc()
        .getContext();
      if (rpcContext && typeof rpcContext === 'object') {
        rpcContext.user = decoded;
      }

      return true;
    } catch (error: unknown) {
      let errorMessage = 'Error desconocido en la autenticación';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }

      console.error('JWT Verification Error:', errorMessage);
      throw new RpcException(
        new UnauthorizedException('Token inválido o expirado'),
      );
    }
  }
}
