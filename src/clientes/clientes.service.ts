import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Cliente,
  TipoCliente,
  StatusCliente,
} from './interfaces/cliente.interface';

@Injectable()
export class ClientesService {
  private clientes: Cliente[] = [
    {
      id: 1,
      nome: 'Ana Souza',
      email: 'ana.souza@email.com',
      idade: 28,
      status: StatusCliente.ATIVO,
      tipo: TipoCliente.PREMIUM,
    },
    {
      id: 2,
      nome: 'Bruno Lima',
      email: 'bruno.lima@email.com',
      idade: 34,
      status: StatusCliente.ATIVO,
      tipo: TipoCliente.PADRAO,
    },
    {
      id: 3,
      nome: 'Carla Mendes',
      email: 'carla.mendes@email.com',
      idade: 41,
      status: StatusCliente.INATIVO,
      tipo: TipoCliente.EMPRESARIAL,
    },
    {
      id: 4,
      nome: 'Diego Alves',
      email: 'diego.alves@email.com',
      idade: 23,
      status: StatusCliente.ATIVO,
      tipo: TipoCliente.PADRAO,
    },
    {
      id: 5,
      nome: 'Empresa Horizonte LTDA',
      email: 'contato@horizonteltda.com',
      idade: 12,
      status: StatusCliente.ATIVO,
      tipo: TipoCliente.EMPRESARIAL,
    },
    {
      id: 6,
      nome: 'Fernanda Rocha',
      email: 'fernanda.rocha@email.com',
      idade: 30,
      status: StatusCliente.INATIVO,
      tipo: TipoCliente.PREMIUM,
    },
  ];

  listarTodos(): Cliente[] {
    return this.clientes;
  }

  buscarPorId(id: number): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado!');
    }

    return cliente;
  }
}
