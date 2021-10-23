export interface LoginResponse {
  token: string;
  expiresIn: Date;
  message?: string;
}
