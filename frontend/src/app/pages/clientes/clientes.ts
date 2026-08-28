import { Component, OnInit, signal } from '@angular/core';
import { BotaoComponent } from '../../components/botao/botao';
import { ColunaTabela, TabelaComponent } from '../../components/tabela/tabela';
import { ModalComponent } from '../../components/modal/modal';
import { InputComponent } from '../../components/input/input';
import { SelectComponent } from '../../components/select/select';
import { PopUpComponent } from '../../components/popup/popup';
import { ClienteService } from '../../services/clientes';
import { Cliente } from '../../models/cliente/cliente';
import { CriarCliente } from '../../models/cliente/criar-cliente';
import { AtualizarCliente } from '../../models/cliente/AtualizarCliente';
import { TipoCliente } from '../../enums/clientes/tipo-cliente.enum';
import { StatusCliente } from '../../enums/clientes/status-cliente.enum';
import { TipoTag } from '../../components/tag/tag';
import {
  tipoTagStatusCliente,
  textoTagStatusCliente,
  tipoTagTipoCliente,
  textoTagTipoCliente,
} from '../../utils/tag-formatter';

@Component({
  selector: 'app-clientes',
  imports: [
    BotaoComponent,
    TabelaComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    PopUpComponent,
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesPage implements OnInit {
  constructor(private clienteService: ClienteService) {}

  TipoCliente = TipoCliente;
  StatusCliente = StatusCliente;

  erroCriacao: string = '';
  modalCriacaoAberto: boolean = false;
  modalEdicaoAberto: boolean = false;
  popUpDelecaoAberto: boolean = false;
  clienteSelecionadoId: number | null = null;

  colunas: ColunaTabela[] = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'Nome', campo: 'nome' },
    { titulo: 'Email', campo: 'email' },
    { titulo: 'Idade', campo: 'idade' },

    {
      titulo: 'Status',
      campo: 'status',
      mostrarComoTag: true,
      tipoTag: tipoTagStatusCliente,
      textoTag: textoTagStatusCliente,
    },

    {
      titulo: 'Tipo',
      campo: 'tipo',
      mostrarComoTag: true,
      tipoTag: tipoTagTipoCliente,
      textoTag: textoTagTipoCliente,
    },
  ];

  clientes = signal<Cliente[]>([]);

  // Campos do modal
  nomeModalCliente: string = '';
  emailModalCliente: string = '';
  idadeModalCliente: string = '';
  tipoModalCliente: TipoCliente | '' = '';
  statusModalCliente: StatusCliente | '' = '';

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
      },

      error: (erro) => {
        console.error('Erro ao buscar clientes.');
      },
    });
  }

  criarCliente() {
    if (
      !this.nomeModalCliente ||
      !this.emailModalCliente ||
      !this.idadeModalCliente ||
      !this.tipoModalCliente ||
      !this.statusModalCliente
    ) {
      this.erroCriacao = 'Preencha todos os campos.';
      return;
    }
    if (Number.isNaN(Number(this.idadeModalCliente))) {
      this.erroCriacao = 'A idade deve ser um número.';
      return;
    }
    this.erroCriacao = '';

    const ModalCliente: CriarCliente = {
      nome: this.nomeModalCliente,
      email: this.emailModalCliente,
      idade: Number(this.idadeModalCliente),
      tipo: this.tipoModalCliente,
      status: this.statusModalCliente,
    };

    this.clienteService.criar(ModalCliente).subscribe({
      next: (clienteCriado) => {
        const clientesAtuais = this.clientes();

        const novaLista = [...clientesAtuais, clienteCriado];

        this.clientes.set(novaLista);

        this.alterarModal('criacao', false);
      },

      error: (erro) => {
        console.error('Erro ao criar cliente:', erro);
      },
    });
    this.nomeModalCliente = '';
    this.emailModalCliente = '';
    this.idadeModalCliente = '';
    this.tipoModalCliente = '';
    this.statusModalCliente = '';
  }

  deletarCliente() {
    if (this.clienteSelecionadoId === null) {
      return;
    }

    const id = this.clienteSelecionadoId;

    this.clienteService.deletar(id).subscribe({
      next: () => {
        const clientesAtuais = this.clientes();

        const novaLista = clientesAtuais.filter((cliente) => cliente.id !== id);

        this.clientes.set(novaLista);

        this.alterarPopUp(false);

        this.clienteSelecionadoId = null;
      },

      error: (erro) => {
        console.error('Erro ao deletar cliente:', erro);
      },
    });
  }

  editarCliente() {
    if (this.clienteSelecionadoId === null) {
      return;
    }

    const idadeConvertida = Number(this.idadeModalCliente);

    if (Number.isNaN(idadeConvertida)) {
      return;
    }

    if (!this.tipoModalCliente || !this.statusModalCliente) {
      return;
    }

    const clienteAtualizado: AtualizarCliente = {
      nome: this.nomeModalCliente,
      email: this.emailModalCliente,
      idade: idadeConvertida,
      tipo: this.tipoModalCliente,
      status: this.statusModalCliente,
    };

    const id = this.clienteSelecionadoId;

    this.clienteService.atualizar(id, clienteAtualizado).subscribe({
      next: (clienteAtualizadoBackend) => {
        const clientesAtuais = this.clientes();

        const novaLista = clientesAtuais.map((cliente) => {
          if (cliente.id === id) {
            return clienteAtualizadoBackend;
          }

          return cliente;
        });

        this.clientes.set(novaLista);

        this.alterarModal('edicao', false);

        this.clienteSelecionadoId = null;
      },

      error: (erro) => {
        console.error('Erro ao atualizar cliente:', erro);
      },
    });
  }

  alterarModal(tipo: 'criacao' | 'edicao', aberto: boolean) {
    if (tipo === 'criacao') {
      this.modalCriacaoAberto = aberto;
    }

    if (tipo === 'edicao') {
      this.modalEdicaoAberto = aberto;
    }
  }

  abrirEdicao(id: number) {
    const cliente = this.clientes().find((cliente) => cliente.id === id);
    if (!cliente) {
      return;
    }
    this.clienteSelecionadoId = id;

    this.nomeModalCliente = cliente.nome;
    this.emailModalCliente = cliente.email;
    this.idadeModalCliente = String(cliente.idade);
    this.tipoModalCliente = cliente.tipo;
    this.statusModalCliente = cliente.status;

    this.alterarModal('edicao', true);
  }

  abrirDelecao(id: number) {
    this.clienteSelecionadoId = id;
    this.alterarPopUp(true);
  }

  alterarPopUp(aberto: boolean) {
    this.popUpDelecaoAberto = aberto;
  }

  buscarClientes(nome: string) {
    this.clienteService.listar(nome).subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
      },
    });
  }

  alterarTipoCliente(valor: string) {
    this.tipoModalCliente = valor as TipoCliente;
  }

  alterarStatusCliente(valor: string) {
    this.statusModalCliente = valor as StatusCliente;
  }
}
