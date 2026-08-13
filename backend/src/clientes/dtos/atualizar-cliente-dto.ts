import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusCliente } from '../enums/status-cliente.enum';
import { TipoCliente } from '../enums/tipo-cliente.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarClienteDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  idade?: number;

  @IsEnum(StatusCliente)
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusCliente;

  @IsEnum(TipoCliente)
  @IsOptional()
  @ApiPropertyOptional()
  tipo?: TipoCliente;
}
