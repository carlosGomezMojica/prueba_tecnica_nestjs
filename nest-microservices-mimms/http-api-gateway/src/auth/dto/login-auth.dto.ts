import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'carlos@gmail.com',
    description: 'El Correo debe estar registrado',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'contrasena123',
    description: 'La contraseña debe concordar con la registrada',
  })
  @MinLength(8)
  password: string;
}
