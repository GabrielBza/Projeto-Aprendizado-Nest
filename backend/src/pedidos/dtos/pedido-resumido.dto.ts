import { StatusPedido } from '../enums/status-pedido.enum';

export class PedidoResumidoDto {
  id!: number;

  produtoId!: number;

  quantidade!: number;

  clienteId!: number;

  status!: StatusPedido;
}
