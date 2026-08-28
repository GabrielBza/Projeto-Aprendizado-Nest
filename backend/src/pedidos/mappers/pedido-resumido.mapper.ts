import { PedidoEntity } from '../pedido.entity';
import { PedidoResumidoDto } from '../dtos/pedido-resumido.dto';

export function formatarPedidoResumido(
  pedido: PedidoEntity,
): PedidoResumidoDto {
  return {
    id: pedido.id,
    produto: {
      id: pedido.produto.id,
      nome: pedido.produto.nome,
    },
    quantidade: pedido.quantidade,
    cliente: {
      id: pedido.cliente.id,
      nome: pedido.cliente.nome,
    },
    status: pedido.status,
  };
}
