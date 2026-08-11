import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusCliente, TipoCliente } from '../interfaces/cliente.interface';

export class AtualizarClienteDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  idade?: number;

  @IsEnum(StatusCliente)
  @IsOptional()
  status?: StatusCliente;

  @IsEnum(TipoCliente)
  @IsOptional()
  tipo?: TipoCliente;
}
