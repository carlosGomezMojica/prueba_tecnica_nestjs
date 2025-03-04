import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface AuthenticatedUser {
  userId: number;
  userName: string;
  email: string;
}

@ApiTags('Users')
@Controller('/user')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsclient: ClientProxy) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.natsclient.emit({ cmd: 'getUsers' }, '');
  }

  @ApiOperation({ summary: 'Crear un usuario nuevo' })
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {
    console.log(user);
    const response = this.natsclient.send({ cmd: 'createUser' }, user);
    return response;
  }

  @ApiOperation({ summary: 'Obtener los datos del usuario logueado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/log')
  getUsersLog(@Req() req: { user?: AuthenticatedUser }) {
    if (!req.user) {
      throw new Error('No se encontró información del usuario');
    }

    const { userId, userName, email } = req.user;

    const data = {
      id: Number(userId), // Convertimos userId a número para evitar `unsafe assignment`
      name: userName,
      email,
    };

    return this.natsclient.emit({ cmd: 'getUserLog' }, data);
  }
}
