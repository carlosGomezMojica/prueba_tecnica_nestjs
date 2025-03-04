import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OrderStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
}
export class UpdateOrderDto {
  @ApiProperty({
    examples: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'],
    description: 'Debe seleccionar el estado segun estos valores',
  })
  @IsNotEmpty({ message: 'El estado del pedido es obligatorio' })
  @IsString()
  @IsEnum(OrderStatus, {
    message: `El estado debe ser uno de los siguientes valores: ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
