import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Pedido 1: cargar archivos',
    description: 'Descripción del pedido',
  })
  @IsString()
  description: string;
  @ApiProperty({
    example: 1,
    description: 'Debe considir con el id de un usuario registrado',
  })
  @IsNotEmpty({ message: 'El userId es requerido' })
  @Type(() => Number)
  userId: number;
}
