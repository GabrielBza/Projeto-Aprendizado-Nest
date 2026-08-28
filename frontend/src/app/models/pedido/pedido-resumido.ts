import { StatusPedido } from '../../enums/pedidos/status-pedido.enum';

export interface ClientePedidoResumido {
  id: number;
  nome: string;
}

export interface ProdutoPedidoResumido {
  id: number;
  nome: string;
}

export interface PedidoResumido {
  id: number;
  produto: ProdutoPedidoResumido;
  quantidade: number;
  cliente: ClientePedidoResumido;
  status: StatusPedido;
}
