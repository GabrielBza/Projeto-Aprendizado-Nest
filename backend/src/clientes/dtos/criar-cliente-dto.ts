import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TipoCliente } from '../enums/tipo-cliente.enum';
import { ApiProperty } from '@nestjs/swagger';

// DTO de criação de cliente, que exige obrigatoriamente o preenchimento dos campos
// Também segue as restrições de valores para Status e Tipo a partir dos Enums
export class CriarClienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idade!: number;

  @IsString()
  @IsEnum(TipoCliente)
  @ApiProperty()
  tipo!: TipoCliente;
}
