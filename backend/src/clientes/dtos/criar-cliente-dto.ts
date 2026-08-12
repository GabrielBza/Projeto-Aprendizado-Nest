import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TipoCliente } from '../enums/tipo-cliente.enum';

export class CriarClienteDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  idade!: number;

  @IsString()
  @IsEnum(TipoCliente)
  tipo!: TipoCliente;
}
