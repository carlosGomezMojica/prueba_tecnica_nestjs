import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async loginUser(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const userExist = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!userExist) throw new HttpException('NO_FOUND_USER', 404);

    const isPassword = await compare(password, userExist.password);

    if (!isPassword) throw new UnauthorizedException();
    const payload = {
      sub: userExist.id,
      email: userExist.email,
      name: userExist.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
