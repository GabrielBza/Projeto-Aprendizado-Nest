import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { StatusPedido } from '../enums/status-pedido.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CriarPedidoDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  produtoId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty()
  quantidade!: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  clienteId!: number;

  @IsEnum(StatusPedido)
  @ApiProperty()
  status!: StatusPedido;
}
