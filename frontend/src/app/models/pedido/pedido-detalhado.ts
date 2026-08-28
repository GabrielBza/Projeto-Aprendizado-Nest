import { StatusPedido } from '../../enums/pedidos/status-pedido.enum';

import { StatusCliente } from '../../enums/clientes/status-cliente.enum';
import { TipoCliente } from '../../enums/clientes/tipo-cliente.enum';

import { CategoriaProduto } from '../../enums/produtos/categoria-produto.enum';

export interface ClientePedidoDetalhado {
  id: number;
  nome: string;
  email: string;
  idade: number;
  status: StatusCliente;
  tipo: TipoCliente;
}

export interface ProdutoPedidoDetalhado {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaProduto;
  disponivel: boolean;
}

export interface PedidoDetalhado {
  id: number;
  produto: ProdutoPedidoDetalhado;
  quantidade: number;
  cliente: ClientePedidoDetalhado;
  status: StatusPedido;
}
