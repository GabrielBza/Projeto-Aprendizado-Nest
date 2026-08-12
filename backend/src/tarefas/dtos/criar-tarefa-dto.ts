import { StatusTarefa } from '../enums/status-tarefa.enum';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CriarTarefaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsEnum(StatusTarefa)
  @IsNotEmpty()
  status!: StatusTarefa;
}
