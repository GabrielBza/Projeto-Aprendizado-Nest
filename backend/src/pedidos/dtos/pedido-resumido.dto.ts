import { StatusPedido } from '../enums/status-pedido.enum';

export class ClientePedidoResumidoDto {
  id!: number;
  nome!: string;
}

export class ProdutoPedidoResumidoDto {
  id!: number;
  nome!: string;
}

export class PedidoResumidoDto {
  id!: number;
  produto!: ProdutoPedidoResumidoDto;
  quantidade!: number;
  cliente!: ClientePedidoResumidoDto;
  status!: StatusPedido;
}
