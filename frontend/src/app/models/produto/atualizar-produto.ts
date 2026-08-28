import { CategoriaProduto } from '../../enums/produtos/categoria-produto.enum';

export interface AtualizarProduto {
  nome?: string;
  descricao?: string;
  preco?: number;
  categoria?: CategoriaProduto;
  disponivel?: boolean;
}
