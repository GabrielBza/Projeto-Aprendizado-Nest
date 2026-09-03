import { TipoUsuario } from '../../usuarios/enums/tipo-usuario.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: TipoUsuario;
  iat?: number;
  exp?: number;
}
