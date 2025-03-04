export interface JwtPayload {
  userId: number;
  userName: string;
  email: string;
  role?: string;
  iat?: number; // (Opcional) Timestamp de emisión
  exp?: number; // (Opcional) Timestamp de expiración
}
