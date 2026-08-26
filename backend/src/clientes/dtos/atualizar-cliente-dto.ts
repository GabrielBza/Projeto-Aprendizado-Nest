import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusCliente } from '../enums/status-cliente.enum';
import { TipoCliente } from '../enums/tipo-cliente.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

// DTO de atualização de cliente, que não exige obrigatoriamente o preenchimento dos campos
// Também segue as restrições de valores para Status e Tipo a partir dos Enums
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
