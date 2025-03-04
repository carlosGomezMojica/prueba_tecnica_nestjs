
export interface AuthPayload {
  token: string; // JWT enviado en cada petición
  requestId?: string; // Opcional: Para rastrear solicitudes en logs
}
