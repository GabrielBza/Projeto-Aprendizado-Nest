import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';
import { AtualizarTarefaDto } from './dtos/atualizar-tarefa-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TarefaEntity } from './tarefa.entity';
import { Repository } from 'typeorm';
import { StatusTarefa } from './enums/status-tarefa.enum';

export interface TarefasPorStatus {
  nome: StatusTarefa;
  quantidade: number;
}
@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(TarefaEntity)
    private readonly tarefasRepository: Repository<TarefaEntity>,
  ) {}

  async listarTodas(): Promise<TarefaEntity[]> {
    return this.tarefasRepository.find();
  }

  async buscarPorId(id: number): Promise<TarefaEntity> {
    const tarefa = await this.tarefasRepository.findOneBy({ id });

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  async criar(dados: CriarTarefaDto): Promise<TarefaEntity> {
    const novaTarefa = this.tarefasRepository.create({
      titulo: dados.titulo,
      descricao: dados.descricao,
      status: StatusTarefa.PENDENTE,
    });

    return this.tarefasRepository.save(novaTarefa);
  }

  async atualizar(
    id: number,
    dados: AtualizarTarefaDto,
  ): Promise<TarefaEntity> {
    const tarefa = await this.buscarPorId(id);

    if (dados.titulo !== undefined) {
      tarefa.titulo = dados.titulo;
    }
    if (dados.descricao !== undefined) {
      tarefa.descricao = dados.descricao;
    }

    return this.tarefasRepository.save(tarefa);
  }

  async avancarStatus(id: number): Promise<TarefaEntity> {
    const tarefa = await this.buscarPorId(id);

    if (tarefa.status === StatusTarefa.EM_ANDAMENTO) {
      tarefa.status = StatusTarefa.CONCLUIDA;
    }
    if (tarefa.status === StatusTarefa.PENDENTE) {
      tarefa.status = StatusTarefa.EM_ANDAMENTO;
    }

    return this.tarefasRepository.save(tarefa);
  }

  async deletar(
    id: number,
  ): Promise<{ mensagem: string; tarefa: TarefaEntity }> {
    const tarefa = await this.buscarPorId(id);

    await this.tarefasRepository.remove(tarefa);

    return { mensagem: 'Tarefa deletada com sucesso', tarefa: tarefa };
  }

  async contarTodos(): Promise<number> {
    return this.tarefasRepository.count();
  }

  async tarefasPorStatus(): Promise<TarefasPorStatus[]> {
    const pendentes: number = await this.tarefasRepository.count({
      where: { status: StatusTarefa.PENDENTE },
    });
    const emAndamento: number = await this.tarefasRepository.count({
      where: { status: StatusTarefa.EM_ANDAMENTO },
    });
    const concluidas: number = await this.tarefasRepository.count({
      where: { status: StatusTarefa.CONCLUIDA },
    });

    return [
      {
        nome: StatusTarefa.PENDENTE,
        quantidade: pendentes,
      },
      {
        nome: StatusTarefa.EM_ANDAMENTO,
        quantidade: emAndamento,
      },
      {
        nome: StatusTarefa.CONCLUIDA,
        quantidade: concluidas,
      },
    ];
  }
}
