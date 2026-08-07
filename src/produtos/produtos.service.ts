import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto, CategoriaProduto } from './interfaces/produto.interface';
import { CriarProdutoDto } from './dtos/criar-produto-dto';
import { AtualizarProdutoDto } from './dtos/atualizar-produto-dto';

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Notebook',
      descricao: 'Notebook para estudos e tarefas do dia a dia.',
      preco: 3500,
      categoria: CategoriaProduto.ELETRONICO,
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Fone de ouvido',
      descricao: 'Fone de ouvido Bluetooth com microfone.',
      preco: 180,
      categoria: CategoriaProduto.ELETRONICO,
      disponivel: true,
    },
    {
      id: 3,
      nome: 'Chocolate',
      descricao: 'Barra de chocolate ao leite de 90g.',
      preco: 8.5,
      categoria: CategoriaProduto.ALIMENTO,
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Camiseta',
      descricao: 'Camiseta básica de algodão.',
      preco: 59.9,
      categoria: CategoriaProduto.ROUPA,
      disponivel: false,
    },
    {
      id: 5,
      nome: 'Carrinho de brinquedo',
      descricao: 'Carrinho de brinquedo em plástico resistente.',
      preco: 35,
      categoria: CategoriaProduto.BRINQUEDO,
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Sabonete',
      descricao: 'Sabonete corporal de 90g.',
      preco: 4.5,
      categoria: CategoriaProduto.HIGIENE,
      disponivel: true,
    },
  ];

  listarTodos(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto {
    const produto = this.produtos.find((produto) => produto.id === id);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return produto;
  }
}
