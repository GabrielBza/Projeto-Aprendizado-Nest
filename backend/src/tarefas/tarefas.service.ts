import { Injectable, NotFoundException } from '@nestjs/common';
import { Tarefa, StatusTarefa } from './interfaces/tarefa.interface';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';
import { AtualizarTarefaDto } from './dtos/atualizar-tarefa-dto';

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Reabastecer a vitrine',
      descricao:
        'Algum funcionário responsável pelo estoque deve realizar uma verificação e reabastecer os produtos que estiverem com poucas unidades na vitrine',
      status: StatusTarefa.CONCLUIDA,
    },
    {
      id: 2,
      titulo: 'Empacotar os pedidos para a entrega',
      descricao:
        'Algum funcionário do setor de embalagens deve empacotar os pedidos com entrega datada para 11/08/2026',
      status: StatusTarefa.PENDENTE,
    },
    {
      id: 3,
      titulo: 'Realizar Balanço',
      descricao:
        'O time de finanças deve realizar o balanço geral do mês e trazer os resultados até o dia 08/08/2026',
      status: StatusTarefa.EM_ANDAMENTO,
    },
  ];

  listarTodas(): Tarefa[] {
    return this.tarefas;
  }

  buscarPorId(id: number): Tarefa {
    const tarefa = this.tarefas.find((tarefa) => tarefa.id === id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  criar(dados: CriarTarefaDto): Tarefa {
    let novaTarefa: Tarefa;

    if (this.tarefas.length === 0) {
      novaTarefa = {
        id: 1,
        titulo: dados.titulo,
        descricao: dados.descricao,
        status: dados.status,
      };
    } else {
      novaTarefa = {
        id: this.tarefas[this.tarefas.length - 1].id + 1,
        titulo: dados.titulo,
        descricao: dados.descricao,
        status: dados.status,
      };
    }

    this.tarefas.push(novaTarefa);

    return novaTarefa;
  }

  atualizar(id: number, dados: AtualizarTarefaDto): Tarefa {
    const tarefa = this.buscarPorId(id);

    if (dados.titulo !== undefined) {
      tarefa.titulo = dados.titulo;
    }

    if (dados.descricao !== undefined) {
      tarefa.descricao = dados.descricao;
    }

    if (dados.status !== undefined) {
      tarefa.status = dados.status;
    }

    return tarefa;
  }

  deletar(id: number): { mensagem: string; tarefa: Tarefa } {
    const tarefa = this.buscarPorId(id);
    const indiceTarefa = this.tarefas.indexOf(tarefa);

    this.tarefas.splice(indiceTarefa, 1);

    return { mensagem: 'Tarefa deletada com sucesso', tarefa: tarefa };
  }
}
