import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { StatusPedido } from '../enums/status-pedido.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarPedidoDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  produtoId?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  @ApiPropertyOptional()
  quantidade?: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  clienteId?: number;

  @IsEnum(StatusPedido)
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusPedido;
}
