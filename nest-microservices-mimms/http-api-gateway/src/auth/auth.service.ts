import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface DataLog {
  id: number;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async loginUser(data: DataLog) {
    const payload = {
      sub: data.id,
      email: data.email,
      name: data.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
