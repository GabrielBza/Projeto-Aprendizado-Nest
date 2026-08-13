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

  async buscarPorId(id: number): Promise<PedidoEntity> {
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

  async criar(dados: CriarPedidoDto): Promise<PedidoEntity> {
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
      status: dados.status,
    });

    return this.pedidosRepository.save(novoPedido);
  }

  async atualizar(
    id: number,
    dados: AtualizarPedidoDto,
  ): Promise<PedidoEntity> {
    const pedido = await this.buscarPorId(id);

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

    return this.pedidosRepository.save(pedido);
  }

  async deletar(
    id: number,
  ): Promise<{ mensagem: string; pedido: PedidoEntity }> {
    const pedido = await this.buscarPorId(id);

    await this.pedidosRepository.remove(pedido);

    return { mensagem: 'Pedido deletado com sucesso.', pedido: pedido };
  }
}
