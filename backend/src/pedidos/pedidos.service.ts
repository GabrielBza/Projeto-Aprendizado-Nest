import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ProdutoEntity } from '../produtos/produto.entity';
import { CriarPedidoDto } from './dtos/criar-pedido.dto';
import { AtualizarPedidoDto } from './dtos/atualizar-pedido.dto';
import { formatarPedidoResumido } from './mappers/pedido-resumido.mapper';
import { PedidoResumidoDto } from './dtos/pedido-resumido.dto';
import { StatusPedido } from './enums/status-pedido.enum';
import { PedidoDetalhadoDto } from './dtos/pedido-detalhado';
import { formatarPedidoDetalhado } from './mappers/pedido-detalhado.mapper';
import { Contador } from '../dashboard/dashboard.service';

export interface Quantidade {
  nome: string;
  quantidade: number;
}

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidosRepository: Repository<PedidoEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clientesRepository: Repository<ClienteEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtosRepository: Repository<ProdutoEntity>,
  ) {}

  async listarTodos(): Promise<PedidoResumidoDto[]> {
    const pedidos = await this.pedidosRepository.find({
      relations: {
        cliente: true,
        produto: true,
      },
    });

    return pedidos.map(formatarPedidoResumido);
  }
  async listarPorProduto(produtoId: number): Promise<PedidoResumidoDto[]> {
    const pedidos = await this.pedidosRepository.find({
      where: {
        produto: {
          id: produtoId,
        },
      },
      relations: {
        produto: true,
        cliente: true,
      },
    });

    return pedidos.map(formatarPedidoResumido);
  }

  async listarPorCliente(clienteId: number): Promise<PedidoResumidoDto[]> {
    const pedidos = await this.pedidosRepository.find({
      where: {
        cliente: {
          id: clienteId,
        },
      },
      relations: {
        produto: true,
        cliente: true,
      },
    });

    return pedidos.map(formatarPedidoResumido);
  }

  async buscarPorId(id: number): Promise<PedidoDetalhadoDto> {
    const pedido = await this.buscarEntidadePorId(id);

    return formatarPedidoDetalhado(pedido);
  }

  private async buscarEntidadePorId(id: number): Promise<PedidoEntity> {
    const pedido = await this.pedidosRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        cliente: true,
        produto: true,
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return pedido;
  }

  async criar(dados: CriarPedidoDto): Promise<PedidoResumidoDto> {
    const cliente = await this.clientesRepository.findOneBy({
      id: dados.clienteId,
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    const produto = await this.produtosRepository.findOneBy({
      id: dados.produtoId,
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const novoPedido = this.pedidosRepository.create({
      produto,
      quantidade: dados.quantidade,
      cliente,
      status: StatusPedido.EM_ANALISE,
    });

    const pedidoSalvo = await this.pedidosRepository.save(novoPedido);

    return formatarPedidoResumido(pedidoSalvo);
  }

  async atualizar(
    id: number,
    dados: AtualizarPedidoDto,
  ): Promise<PedidoResumidoDto> {
    const pedido = await this.buscarEntidadePorId(id);

    if (dados.produtoId !== undefined) {
      const produto = await this.produtosRepository.findOneBy({
        id: dados.produtoId,
      });

      if (!produto) {
        throw new NotFoundException('Produto não encontrado.');
      }

      pedido.produto = produto;
    }

    if (dados.quantidade !== undefined) {
      pedido.quantidade = dados.quantidade;
    }

    if (dados.clienteId !== undefined) {
      const cliente = await this.clientesRepository.findOneBy({
        id: dados.clienteId,
      });

      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado.');
      }

      pedido.cliente = cliente;
    }

    if (dados.status !== undefined) {
      pedido.status = dados.status;
    }

    const pedidoAtualizado = await this.pedidosRepository.save(pedido);

    return formatarPedidoResumido(pedidoAtualizado);
  }

  async deletar(
    id: number,
  ): Promise<{ mensagem: string; pedido: PedidoResumidoDto }> {
    const pedido = await this.buscarEntidadePorId(id);

    const pedidoResumido = formatarPedidoResumido(pedido);

    await this.pedidosRepository.remove(pedido);

    return { mensagem: 'Pedido deletado com sucesso.', pedido: pedidoResumido };
  }
  async contarTodos(): Promise<number> {
    return this.pedidosRepository.count();
  }

  async top3CategoriasMaisPedidas(): Promise<Quantidade[]> {
    const resultado_busca = await this.pedidosRepository
      .createQueryBuilder('pedido')
      .innerJoin('pedido.produto', 'produto')
      .select('produto.categoria', 'nome')
      .addSelect('COUNT(pedido.id)', 'quantidade')
      .groupBy('produto.categoria')
      .orderBy('quantidade', 'DESC')
      .limit(3)
      .getRawMany<Quantidade>();

    return resultado_busca.map((item) => ({
      nome: item.nome,
      quantidade: Number(item.quantidade),
    }));
  }

  async pedidosPorTipoDeCliente(): Promise<Quantidade[]> {
    const resultado_busca = await this.pedidosRepository
      .createQueryBuilder('pedido')
      .innerJoin('pedido.cliente', 'cliente')
      .select('cliente.tipo', 'nome')
      .addSelect('COUNT(pedido.id)', 'quantidade')
      .groupBy('cliente.tipo')
      .orderBy('quantidade', 'DESC')
      .getRawMany<Quantidade>();

    return resultado_busca.map((item) => ({
      nome: item.nome,
      quantidade: Number(item.quantidade),
    }));
  }

  async mediaUnidadesPorPedido(): Promise<Contador[]> {
    const resultado = await this.pedidosRepository
      .createQueryBuilder('pedido')
      .innerJoin('pedido.produto', 'produto')
      .select('produto.nome', 'nome')
      .addSelect('AVG(pedido.quantidade)', 'quantidade')
      .groupBy('produto.id')
      .addGroupBy('produto.nome')
      .getRawMany<Quantidade>();

    return resultado.map((item) => ({
      nome: item.nome,
      quantidade: Number(item.quantidade),
    }));
  }
}
