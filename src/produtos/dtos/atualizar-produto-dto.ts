import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { CategoriaProduto } from '../interfaces/produto.interface';

export class AtualizarProdutoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsEnum(CategoriaProduto)
  categoria?: CategoriaProduto;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}
