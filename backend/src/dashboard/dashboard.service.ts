import { Injectable } from '@nestjs/common';
import { TarefasService } from '../tarefas/tarefas.service';
import { ClientesService } from '../clientes/clientes.service';
import { ProdutosService } from '../produtos/produtos.service';
import { PedidosService } from '../pedidos/pedidos.service';

export interface Contador {
  nome: string;
  quantidade: number;
}

@Injectable()
export class DashboardService {
  constructor(
    private tarefasService: TarefasService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private pedidosService: PedidosService,
  ) {}

  async contarTudo(): Promise<Contador[]> {
    const tarefas: number = await this.tarefasService.contarTodos();
    const clientes: number = await this.clientesService.contarTodos();
    const produtos: number = await this.produtosService.contarTodos();
    const pedidos: number = await this.pedidosService.contarTodos();

    return [
      { nome: 'tarefas', quantidade: tarefas },
      { nome: 'clientes', quantidade: clientes },
      { nome: 'produtos', quantidade: produtos },
      { nome: 'pedidos', quantidade: pedidos },
    ];
  }

  async tarefasPorStatus(): Promise<Contador[]> {
    return this.tarefasService.tarefasPorStatus();
  }

  async produtosPorCategoria(): Promise<Contador[]> {
    return this.produtosService.produtosPorCategoria();
  }

  async clientesPorStatus(): Promise<Contador[]> {
    return this.clientesService.clientesPorStatus();
  }

  async top3CategoriasMaisPedidas(): Promise<Contador[]> {
    return this.pedidosService.top3CategoriasMaisPedidas();
  }

  async pedidosPorTipoCliente(): Promise<Contador[]> {
    return this.pedidosService.pedidosPorTipoDeCliente();
  }

  async mediaUnidadesPorPedido(): Promise<Contador[]> {
    return this.pedidosService.mediaUnidadesPorPedido();
  }
}
