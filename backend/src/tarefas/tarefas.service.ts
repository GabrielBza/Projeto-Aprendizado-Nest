import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';
import { AtualizarTarefaDto } from './dtos/atualizar-tarefa-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TarefaEntity } from './tarefa.entity';
import { Repository } from 'typeorm';

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
    const novaTarefa = this.tarefasRepository.create(dados);

    return this.tarefasRepository.save(novaTarefa);
  }

  async atualizar(
    id: number,
    dados: AtualizarTarefaDto,
  ): Promise<TarefaEntity> {
    const tarefa = await this.buscarPorId(id);

    Object.assign(tarefa, dados);

    return this.tarefasRepository.save(tarefa);
  }

  async deletar(
    id: number,
  ): Promise<{ mensagem: string; tarefa: TarefaEntity }> {
    const tarefa = await this.buscarPorId(id);

    await this.tarefasRepository.remove(tarefa);

    return { mensagem: 'Tarefa deletada com sucesso', tarefa: tarefa };
  }
}
