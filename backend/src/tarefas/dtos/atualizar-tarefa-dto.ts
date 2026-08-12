import { StatusTarefa } from '../enums/status-tarefa.enum';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class AtualizarTarefaDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(StatusTarefa)
  @IsOptional()
  status?: StatusTarefa;
}
