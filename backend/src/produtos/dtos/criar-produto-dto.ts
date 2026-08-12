import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CategoriaProduto } from '../enums/categoria_produto.enum';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsNumber()
  @IsNotEmpty()
  preco!: number;

  @IsEnum(CategoriaProduto)
  @IsNotEmpty()
  categoria!: CategoriaProduto;

  @IsBoolean()
  disponivel!: boolean;
}
