import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarProdutoDto } from './dtos/criar-produto-dto';
import { AtualizarProdutoDto } from './dtos/atualizar-produto-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Like, Repository } from 'typeorm';

export type ProdutosPorCategoria = {
  nome: string;
  quantidade: number;
};

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtosRepository: Repository<ProdutoEntity>,
  ) {}

  async listar(nome?: string): Promise<ProdutoEntity[]> {
    if (nome && nome.trim() !== '') {
      return this.produtosRepository.find({
        where: {
          nome: Like(`%${nome.trim()}%`),
        },
      });
    }

    return this.produtosRepository.find();
  }

  async buscarPorId(id: number): Promise<ProdutoEntity> {
    const produto = await this.produtosRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return produto;
  }

  async criar(dados: CriarProdutoDto): Promise<ProdutoEntity> {
    const novoProduto = this.produtosRepository.create(dados);

    return this.produtosRepository.save(novoProduto);
  }

  async atualizar(
    id: number,
    dados: AtualizarProdutoDto,
  ): Promise<ProdutoEntity> {
    const produto = await this.buscarPorId(id);

    Object.assign(produto, dados);

    return this.produtosRepository.save(produto);
  }

  async deletar(
    id: number,
  ): Promise<{ mensagem: string; produto: ProdutoEntity }> {
    const produto = await this.buscarPorId(id);

    await this.produtosRepository.remove(produto);

    return { mensagem: 'Produto deletado com sucesso!', produto: produto };
  }

  async contarTodos(): Promise<number> {
    return this.produtosRepository.count();
  }

  async produtosPorCategoria(): Promise<ProdutosPorCategoria[]> {
    const resultado = await this.produtosRepository
      .createQueryBuilder('produto')
      .select('produto.categoria', 'nome')
      .addSelect('COUNT(*)', 'quantidade')
      .groupBy('produto.categoria')
      .getRawMany<ProdutosPorCategoria>();

    return resultado;
  }
}
