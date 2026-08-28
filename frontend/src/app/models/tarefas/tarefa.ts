import { StatusTarefa } from '../../enums/tarefas/status-tarefa.enum';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: StatusTarefa;
}
