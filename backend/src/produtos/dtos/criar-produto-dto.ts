import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CategoriaProduto } from '../enums/categoria_produto.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  preco!: number;

  @IsEnum(CategoriaProduto)
  @IsNotEmpty()
  @ApiProperty()
  categoria!: CategoriaProduto;

  @IsBoolean()
  @ApiProperty()
  disponivel!: boolean;
}
