import {
  Controller,
  Body,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/user')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersServices.getUser();
  }

  @ApiOperation({ summary: 'Obtener los datos del usuario logueado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/log')
  getUsersLog(@Req() req: any) {
    const user = req.user;
    return this.usersServices.getUserLog(
      parseInt(user.userId),
      user.userName,
      user.email,
    );
  }

  @ApiOperation({ summary: 'Crear un usuario nuevo' })
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {
    return this.usersServices.createUser(user.name, user.email, user.password);
  }
}
