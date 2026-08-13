import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { CategoriaProduto } from '../enums/categoria_produto.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarProdutoDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  preco?: number;

  @IsOptional()
  @IsEnum(CategoriaProduto)
  @ApiPropertyOptional()
  categoria?: CategoriaProduto;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  disponivel?: boolean;
}
