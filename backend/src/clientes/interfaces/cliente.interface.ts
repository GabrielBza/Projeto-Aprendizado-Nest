export interface Cliente {
  id: number;
  nome: string;
  email: string;
  idade: number;
  status: StatusCliente;
  tipo: TipoCliente;
}

export enum StatusCliente {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export enum TipoCliente {
  PADRAO = 'PADRAO',
  PREMIUM = 'PREMIUM',
  EMPRESARIAL = 'EMPRESARIAL',
}
