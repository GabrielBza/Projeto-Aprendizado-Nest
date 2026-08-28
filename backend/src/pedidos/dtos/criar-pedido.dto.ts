import { IsInt, IsNotEmpty, Min } from 'class-validator';
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
}
