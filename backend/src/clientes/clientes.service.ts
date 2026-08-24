import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteEntity } from './cliente.entity';
import { CriarClienteDto } from './dtos/criar-cliente-dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente-dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clientesRepository: Repository<ClienteEntity>,
  ) {}

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

  async buscarPorId(id: number): Promise<ClienteEntity> {
    const cliente = await this.clientesRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado!');
    }

    return cliente;
  }

  async criar(dados: CriarClienteDto): Promise<ClienteEntity> {
    const novoCliente = this.clientesRepository.create(dados);

    return this.clientesRepository.save(novoCliente);
  }

  async atualizar(
    id: number,
    dados: AtualizarClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.buscarPorId(id);

    Object.assign(cliente, dados);
    return this.clientesRepository.save(cliente);
  }

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
