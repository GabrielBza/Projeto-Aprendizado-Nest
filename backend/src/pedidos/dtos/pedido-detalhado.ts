import { StatusPedido } from '../enums/status-pedido.enum';
import { StatusCliente } from '../../clientes/enums/status-cliente.enum';
import { TipoCliente } from '../../clientes/enums/tipo-cliente.enum';
import { CategoriaProduto } from '../../produtos/enums/categoria_produto.enum';

export class ClientePedidoDetalhadoDto {
  id!: number;
  nome!: string;
  email!: string;
  idade!: number;
  status!: StatusCliente;
  tipo!: TipoCliente;
}

export class ProdutoPedidoDetalhadoDto {
  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  categoria!: CategoriaProduto;
  disponivel!: boolean;
}

export class PedidoDetalhadoDto {
  id!: number;
  produto!: ProdutoPedidoDetalhadoDto;
  quantidade!: number;
  cliente!: ClientePedidoDetalhadoDto;
  status!: StatusPedido;
}
