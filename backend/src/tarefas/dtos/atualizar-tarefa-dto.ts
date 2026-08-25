import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AtualizarTarefaDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;
}
