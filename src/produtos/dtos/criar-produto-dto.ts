import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CategoriaProduto } from '../interfaces/produto.interface';

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
  @IsNotEmpty()
  disponivel!: boolean;
}
