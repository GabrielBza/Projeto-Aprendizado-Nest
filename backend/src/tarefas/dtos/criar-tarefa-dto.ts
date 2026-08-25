import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CriarTarefaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao!: string;
}
