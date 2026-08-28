import { PedidoEntity } from '../pedido.entity';
import { PedidoDetalhadoDto } from '../dtos/pedido-detalhado';

export function formatarPedidoDetalhado(
  pedido: PedidoEntity,
): PedidoDetalhadoDto {
  return {
    id: pedido.id,
    produto: {
      id: pedido.produto.id,
      nome: pedido.produto.nome,
      descricao: pedido.produto.descricao,
      preco: pedido.produto.preco,
      categoria: pedido.produto.categoria,
      disponivel: pedido.produto.disponivel,
    },
    quantidade: pedido.quantidade,
    cliente: {
      id: pedido.cliente.id,
      nome: pedido.cliente.nome,
      email: pedido.cliente.email,
      idade: pedido.cliente.idade,
      status: pedido.cliente.status,
      tipo: pedido.cliente.tipo,
    },
    status: pedido.status,
  };
}
