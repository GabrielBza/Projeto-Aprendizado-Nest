import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoriaProduto } from '../interfaces/produto.interface';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsString()
  @IsNotEmpty()
  preco!: number;

  @IsEnum(CategoriaProduto)
  @IsNotEmpty()
  categoria!: CategoriaProduto;

  @IsString()
  @IsNotEmpty()
  disponivel!: boolean;
}
