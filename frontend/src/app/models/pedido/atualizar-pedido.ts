import { StatusPedido } from '../../enums/pedidos/status-pedido.enum';

export interface AtualizarPedido {
  produtoId?: number;
  quantidade?: number;
  clienteId?: number;
  status?: StatusPedido;
}
