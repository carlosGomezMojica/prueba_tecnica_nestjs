import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() userLogin: LoginAuthDto) {
    return this.authService.loginUser(userLogin.email, userLogin.password);
  }
}
