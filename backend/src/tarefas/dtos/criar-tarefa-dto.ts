import { StatusTarefa } from '../interfaces/tarefa.interface';
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
