import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteEntity } from './cliente.entity';
import { CriarClienteDto } from './dtos/criar-cliente-dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente-dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Service de clientes. Camada que contém as lógicas e regras de negócio e que se comunica com o banco de dados (repository abstraído) e com o controller.
@Injectable()
export class ClientesService {
  // Injeção de dependência do repository da camada 'Entity' (Nesse caso, ele é abstraído, não foi implementado no projeto).
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clientesRepository: Repository<ClienteEntity>,
  ) {}

  // Função de listagem de clientes que pode ou não receber um nome, retornando tudo caso o nome não seja passado, ou retornando clientes
  // que possuem nome correspondente com a string passada.
  async listar(nome?: string): Promise<ClienteEntity[]> {
    if (nome && nome.trim() !== '') {
      return this.clientesRepository.find({
        where: {
          nome: Like(`%${nome.trim()}%`),
        },
      });
    }

    return this.clientesRepository.find();
  }

  // Função de busca que procura um cliente pelo seu Id.
  async buscarPorId(id: number): Promise<ClienteEntity> {
    const cliente = await this.clientesRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado!');
    }

    return cliente;
  }

  // Função de criação que utiliza dos dados recebidos para registrar um novo cliente (Todos os campos devem ser preenchidos).
  async criar(dados: CriarClienteDto): Promise<ClienteEntity> {
    const novoCliente = this.clientesRepository.create(dados);

    return this.clientesRepository.save(novoCliente);
  }

  // Função de atualização que busca um cliente por seu id e utiliza dos dados recebidos para atualizar o cliente correspondente
  // (Todos os campos são opcionais).
  async atualizar(
    id: number,
    dados: AtualizarClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.buscarPorId(id);

    Object.assign(cliente, dados);
    return this.clientesRepository.save(cliente);
  }

  // Função que busca um registro de cliente pelo seu id e em seguida remove o registro.
  async deletar(
    id: number,
  ): Promise<{ mensagem: string; cliente: ClienteEntity }> {
    const cliente = await this.buscarPorId(id);

    await this.clientesRepository.delete(cliente.id);
    return {
      mensagem: 'O cliente foi deletado com sucesso!',
      cliente: cliente,
    };
  }
}
