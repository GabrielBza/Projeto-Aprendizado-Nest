import { StatusTarefa } from '../interfaces/tarefa.interface';
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
