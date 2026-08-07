export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaProduto;
  disponivel: boolean;
}

export enum CategoriaProduto {
  ELETRONICO = 'ELETRONICO',
  ALIMENTO = 'ALIMENTO',
  ROUPA = 'ROUPA',
  BRINQUEDO = 'BRINQUEDO',
  HIGIENE = 'HIGIENE',
}
