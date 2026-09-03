import { ApiProperty } from '@nestjs/swagger';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class CriarUsuarioDto {
  @ApiProperty()
  nome!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  senha!: string;

  @ApiProperty()
  role!: TipoUsuario;
}
