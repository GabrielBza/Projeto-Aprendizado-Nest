import { ApiProperty } from '@nestjs/swagger';
import { StatusTarefa } from '../enums/status-tarefa.enum';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CriarTarefaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao!: string;

  @IsEnum(StatusTarefa)
  @IsNotEmpty()
  @ApiProperty()
  status!: StatusTarefa;
}
