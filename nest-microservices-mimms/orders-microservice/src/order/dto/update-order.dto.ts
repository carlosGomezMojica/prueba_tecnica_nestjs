export enum OrderStatus {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
}
export class UpdateOrderDto {
  status: OrderStatus;
  id: number;
}
