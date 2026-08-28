import { Component, OnInit, signal } from '@angular/core';

import { CardComponent } from '../../components/card/card';
import { Tarefa } from '../../models/tarefas/tarefa';
import { TarefaService } from '../../services/tarefas';
import { BotaoComponent } from '../../components/botao/botao';
import { TagComponent } from '../../components/tag/tag';
import { ModalComponent } from '../../components/modal/modal';
import { PopUpComponent } from '../../components/popup/popup';
import { InputComponent } from '../../components/input/input';
import { AtualizarTarefa } from '../../models/tarefas/atualizar-tarefa';
import { CriarTarefa } from '../../models/tarefas/criar-tarefa';
import { StatusTarefa } from '../../enums/tarefas/status-tarefa.enum';

@Component({
  selector: 'app-tarefas',
  imports: [
    CardComponent,
    BotaoComponent,
    TagComponent,
    ModalComponent,
    PopUpComponent,
    InputComponent,
  ],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css',
})
export class TarefasPage implements OnInit {
  constructor(private tarefaService: TarefaService) {}

  tarefas = signal<Tarefa[]>([]);

  erro: string = '';

  StatusTarefa = StatusTarefa;

  modalCriacaoAberto: boolean = false;
  modalDetalhesAberto: boolean = false;
  modalEdicaoAberto: boolean = false;
  popupDelecaoAberto: boolean = false;
  popupAvancoAberto: boolean = false;

  tituloTarefaModal: string = '';
  descricaoTarefaModal: string = '';
  tarefaSelecionada: Tarefa | null = null;

  colunas = [
    {
      titulo: 'Pendentes',
      status: StatusTarefa.PENDENTE,
    },
    {
      titulo: 'Em andamento',
      status: StatusTarefa.EM_ANDAMENTO,
    },
    {
      titulo: 'Concluídas',
      status: StatusTarefa.CONCLUIDA,
    },
  ];

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefaService.listar().subscribe({
      next: (tarefas) => {
        this.tarefas.set(tarefas);
      },

      error: (erro) => {
        console.error('Erro ao buscar tarefas:', erro);
      },
    });
  }

  cardsDaColuna(status: StatusTarefa) {
    return this.tarefas().filter((tarefa) => tarefa.status === status);
  }

  abrirDetalhes(tarefa: Tarefa) {
    this.tarefaSelecionada = tarefa;
    this.modalDetalhesAberto = true;
  }

  fecharDetalhes() {
    this.tarefaSelecionada = null;
    this.modalDetalhesAberto = false;
  }

  abrirCriacao(aberto: boolean) {
    this.modalCriacaoAberto = aberto;
  }

  criarTarefa() {
    this.erro = '';

    if (!this.tituloTarefaModal || !this.descricaoTarefaModal) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const novaTarefa: CriarTarefa = {
      titulo: this.tituloTarefaModal,
      descricao: this.descricaoTarefaModal,
    };

    this.tarefaService.criar(novaTarefa).subscribe({
      next: (tarefaCriada) => {
        const tarefasAtuais = this.tarefas();

        const novaLista = [...tarefasAtuais, tarefaCriada];

        this.tarefas.set(novaLista);

        this.modalCriacaoAberto = false;

        this.tituloTarefaModal = '';
        this.descricaoTarefaModal = '';
      },

      error: (erro) => {
        this.erro = 'Não foi possível criar a tarefa.';
        console.error('Erro ao criar tarefa:', erro);
      },
    });
  }

  abrirEdicao() {
    if (!this.tarefaSelecionada) {
      return;
    }

    this.tituloTarefaModal = this.tarefaSelecionada.titulo;
    this.descricaoTarefaModal = this.tarefaSelecionada.descricao;

    this.modalDetalhesAberto = false;
    this.modalEdicaoAberto = true;
  }

  editarTarefa() {
    if (!this.tarefaSelecionada) {
      return;
    }
    if (!this.tituloTarefaModal || !this.descricaoTarefaModal) {
      return;
    }

    const tarefaAtualizada: AtualizarTarefa = {
      titulo: this.tituloTarefaModal,
      descricao: this.descricaoTarefaModal,
    };

    const id = this.tarefaSelecionada.id;

    this.tarefaService.editar(id, tarefaAtualizada).subscribe({
      next: (tarefaBack) => {
        const tarefasAtuais = this.tarefas();

        const novaLista = tarefasAtuais.map((tarefa) => {
          if (tarefa.id === id) {
            return tarefaBack;
          }

          return tarefa;
        });

        this.tarefas.set(novaLista);

        this.modalEdicaoAberto = false;
        this.tarefaSelecionada = null;

        this.tituloTarefaModal = '';
        this.descricaoTarefaModal = '';
      },

      error: (erro) => {
        console.error('Erro ao editar tarefa:', erro);
      },
    });
  }

  abrirPopupAvanco(aberto = true) {
    this.popupAvancoAberto = aberto;
    this.modalDetalhesAberto = !aberto;
  }

  avancarStatus() {
    if (!this.tarefaSelecionada) {
      return;
    }

    const id = this.tarefaSelecionada.id;

    this.tarefaService.avancarStatus(id).subscribe({
      next: (tarefaStatusAtualizado) => {
        const tarefasAtuais = this.tarefas();

        const novaLista = tarefasAtuais.map((tarefa) => {
          if (tarefa.id === id) {
            return tarefaStatusAtualizado;
          }
          return tarefa;
        });

        this.tarefas.set(novaLista);

        this.tarefaSelecionada = tarefaStatusAtualizado;
      },

      error: (erro) => {
        console.error('Erro ao avançar o status da tarefa:', erro);
      },
    });
  }

  abrirDelecao() {
    this.popupDelecaoAberto = true;
    this.modalDetalhesAberto = false;
  }

  deletarTarefa() {
    if (!this.tarefaSelecionada) {
      return;
    }

    const id = this.tarefaSelecionada.id;

    this.tarefaService.deletar(id).subscribe({
      next: () => {
        const tarefasAtuais = this.tarefas();

        const novaLista = tarefasAtuais.filter((tarefa) => tarefa.id !== id);

        this.tarefas.set(novaLista);

        this.popupDelecaoAberto = false;
        this.modalDetalhesAberto = false;
        this.tarefaSelecionada = null;
      },

      error: (erro) => {
        console.error('Erro ao excluir tarefa:', erro);
      },
    });
  }

  tipoTag(status: string) {
    if (status === StatusTarefa.PENDENTE) {
      return 'pendente';
    }

    if (status === StatusTarefa.EM_ANDAMENTO) {
      return 'em_andamento';
    }

    return 'concluida';
  }

  textoTag(status: string) {
    if (status === StatusTarefa.PENDENTE) {
      return 'Pendente';
    }

    if (status === StatusTarefa.EM_ANDAMENTO) {
      return 'Em andamento';
    }

    return 'Concluída';
  }
}
