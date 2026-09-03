export interface JwtPayload {
  sub: number;
  email: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
}
