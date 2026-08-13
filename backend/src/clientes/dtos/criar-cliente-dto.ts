import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TipoCliente } from '../enums/tipo-cliente.enum';
import { ApiProperty } from '@nestjs/swagger';

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
