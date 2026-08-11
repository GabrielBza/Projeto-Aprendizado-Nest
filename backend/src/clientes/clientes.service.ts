import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Cliente,
  TipoCliente,
  StatusCliente,
} from './interfaces/cliente.interface';
import { CriarClienteDto } from './dtos/criar-cliente-dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente-dto';

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

  criar(dados: CriarClienteDto): Cliente {
    let novoCliente: Cliente;

    if (this.clientes.length === 0) {
      novoCliente = {
        id: 1,
        nome: dados.nome,
        email: dados.email,
        idade: dados.idade,
        status: StatusCliente.ATIVO,
        tipo: dados.tipo,
      };
    } else {
      novoCliente = {
        id: this.clientes[this.clientes.length - 1].id + 1,
        nome: dados.nome,
        email: dados.email,
        idade: dados.idade,
        status: StatusCliente.ATIVO,
        tipo: dados.tipo,
      };
    }

    this.clientes.push(novoCliente);

    return novoCliente;
  }

  atualizar(id: number, dados: AtualizarClienteDto): Cliente {
    const cliente = this.buscarPorId(id);

    if (dados.nome !== undefined) {
      cliente.nome = dados.nome;
    }
    if (dados.email !== undefined) {
      cliente.email = dados.email;
    }
    if (dados.idade !== undefined) {
      cliente.idade = dados.idade;
    }
    if (dados.status !== undefined) {
      cliente.status = dados.status;
    }
    if (dados.tipo !== undefined) {
      cliente.tipo = dados.tipo;
    }

    return cliente;
  }

  deletar(id: number): { mensagem: string; cliente: Cliente } {
    const cliente = this.buscarPorId(id);
    const indiceCliente = this.clientes.indexOf(cliente);

    this.clientes.splice(indiceCliente, 1);
    return {
      mensagem: 'O cliente foi deletado com sucesso!',
      cliente: cliente,
    };
  }
}
