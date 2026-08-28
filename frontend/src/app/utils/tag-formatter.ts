import { TipoTag } from '../components/tag/tag';

import { StatusCliente } from '../enums/clientes/status-cliente.enum';
import { TipoCliente } from '../enums/clientes/tipo-cliente.enum';

import { CategoriaProduto } from '../enums/produtos/categoria-produto.enum';

import { StatusPedido } from '../enums/pedidos/status-pedido.enum';

export function tipoTagStatusCliente(status: StatusCliente): TipoTag {
  if (status === StatusCliente.ATIVO) {
    return 'ativo';
  }

  return 'inativo';
}

export function textoTagStatusCliente(status: StatusCliente): string {
  if (status === StatusCliente.ATIVO) {
    return 'Ativo';
  }

  return 'Inativo';
}

export function tipoTagTipoCliente(tipo: TipoCliente): TipoTag {
  if (tipo === TipoCliente.PADRAO) {
    return 'padrao';
  }

  if (tipo === TipoCliente.PREMIUM) {
    return 'premium';
  }

  return 'empresarial';
}

export function textoTagTipoCliente(tipo: TipoCliente): string {
  if (tipo === TipoCliente.PADRAO) {
    return 'Padrão';
  }

  if (tipo === TipoCliente.PREMIUM) {
    return 'Premium';
  }

  return 'Empresarial';
}

export function tipoTagCategoriaProduto(categoria: CategoriaProduto): TipoTag {
  if (categoria === CategoriaProduto.ELETRONICO) {
    return 'eletronico';
  }

  if (categoria === CategoriaProduto.ALIMENTO) {
    return 'alimento';
  }

  if (categoria === CategoriaProduto.ROUPA) {
    return 'roupa';
  }

  if (categoria === CategoriaProduto.BRINQUEDO) {
    return 'brinquedo';
  }

  return 'higiene';
}

export function textoTagCategoriaProduto(categoria: CategoriaProduto): string {
  if (categoria === CategoriaProduto.ELETRONICO) {
    return 'Eletrônico';
  }

  if (categoria === CategoriaProduto.ALIMENTO) {
    return 'Alimento';
  }

  if (categoria === CategoriaProduto.ROUPA) {
    return 'Roupa';
  }

  if (categoria === CategoriaProduto.BRINQUEDO) {
    return 'Brinquedo';
  }

  return 'Higiene';
}

export function tipoTagDisponibilidadeProduto(disponivel: boolean): TipoTag {
  if (disponivel) {
    return 'disponivel';
  }

  return 'indisponivel';
}

export function textoTagDisponibilidadeProduto(disponivel: boolean): string {
  if (disponivel) {
    return 'Disponível';
  }

  return 'Indisponível';
}

export function tipoTagStatusPedido(status: StatusPedido): TipoTag {
  if (status === StatusPedido.EM_ANALISE) {
    return 'em_analise';
  }

  if (status === StatusPedido.CONFIRMADO) {
    return 'confirmado';
  }

  if (status === StatusPedido.A_CAMINHO) {
    return 'a_caminho';
  }

  if (status === StatusPedido.ENTREGUE) {
    return 'entregue';
  }

  if (status === StatusPedido.ATRASADO) {
    return 'atrasado';
  }

  return 'cancelado';
}

export function textoTagStatusPedido(status: StatusPedido): string {
  if (status === StatusPedido.EM_ANALISE) {
    return 'Em análise';
  }

  if (status === StatusPedido.CONFIRMADO) {
    return 'Confirmado';
  }

  if (status === StatusPedido.A_CAMINHO) {
    return 'A caminho';
  }

  if (status === StatusPedido.ENTREGUE) {
    return 'Entregue';
  }

  if (status === StatusPedido.ATRASADO) {
    return 'Atrasado';
  }

  return 'Cancelado';
}
