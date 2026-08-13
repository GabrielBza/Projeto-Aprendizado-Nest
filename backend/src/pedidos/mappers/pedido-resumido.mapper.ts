import { PedidoEntity } from '../pedido.entity';

export function formatarPedidoResumido(pedido: PedidoEntity) {
  return {
    id: pedido.id,
    produtoId: pedido.produto.id,
    quantidade: pedido.quantidade,
    clienteId: pedido.cliente.id,
    status: pedido.status,
  };
}
