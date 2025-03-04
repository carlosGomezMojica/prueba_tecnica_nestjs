import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Carlos Gómez', description: 'Nombre del usuario' })
  @IsString({ message: 'El nombre tiene que ser más grande que 3 caracteres' })
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'contrasena123',
    description: 'Contraseña de mínimo 8 caracteres',
  })
  @IsString({ message: 'La contraseña tiene que tener mínimo 8 caracteres' })
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'carlos@gmail.com',
    description: 'El correo tiene que tener estructura valida',
  })
  @IsString()
  @MinLength(5)
  @IsEmail()
  email: string;
}
