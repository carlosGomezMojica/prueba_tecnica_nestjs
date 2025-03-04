export interface IValidateUserResponse {
  status: boolean;
  data?: {
    message?: string;
    id?: number;
    name?: string;
    email?: string;
    [key: string]: any; // Permite otros posibles campos en `data`
  };
}
