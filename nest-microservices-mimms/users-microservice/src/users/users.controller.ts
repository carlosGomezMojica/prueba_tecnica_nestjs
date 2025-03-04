import { Controller } from '@nestjs/common';
import { CreateUserDto } from 'test/users/dtos/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { ShowUserDto } from './dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class UserMicroserviceController {
  constructor(private userServices: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    console.log('que paso?');
    console.log('createUserDto:', data);

    const response = this.userServices.createUser(
      data.name,
      data.email,
      data.password,
    );

    return { msm: 'pass' };
  }

  @MessagePattern({ cmd: 'getUsers' })
  getUsers() {
    return this.userServices.getUser();
  }

  @MessagePattern({ cmd: 'getUsersLog' })
  getUsersLog(@Payload() data: ShowUserDto) {
    return this.userServices.getUserLog(data.id, data.name, data.email);
  }

  @MessagePattern({ cmd: 'validateUser' })
  validateUser(@Payload() data: LoginAuthDto) {
    console.log('que esta pasando?');
    return this.userServices.validateUser(data.email, data.password);
  }
}
