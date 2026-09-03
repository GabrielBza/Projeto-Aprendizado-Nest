export interface LoginResponse {
  access_token: string;
  role: 'USER' | 'ADMIN';
}
