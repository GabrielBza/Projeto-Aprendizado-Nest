import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTarefa } from '../enums/status-tarefa.enum';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class AtualizarTarefaDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsEnum(StatusTarefa)
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusTarefa;
}
