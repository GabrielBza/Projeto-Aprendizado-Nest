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

  erroCriacao: string = '';
  modalCriacaoAberto: boolean = false;
  modalEdicaoAberto: boolean = false;
  popUpDelecaoAberto: boolean = false;
  clienteSelecionadoId: number | null = null;

  colunas: ColunaTabela[] = [
    { titulo: 'Nome', campo: 'nome' },
    { titulo: 'Email', campo: 'email' },
    { titulo: 'Idade', campo: 'idade' },
    { titulo: 'Tipo', campo: 'tipo' },
    { titulo: 'Status', campo: 'status' },
  ];

  clientes = signal<Cliente[]>([]);

  // Campos da CRIAÇÂO
  nomeNovoCliente: string = '';
  emailNovoCliente: string = '';
  idadeNovoCliente: string = '';
  tipoNovoCliente: string = '';
  statusNovoCliente: string = '';

  // Campos da EDIÇÂO
  nomeClienteEdicao: string = '';
  emailClienteEdicao: string = '';
  idadeClienteEdicao: string = '';
  tipoClienteEdicao: string = '';
  statusClienteEdicao: string = '';

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
      !this.nomeNovoCliente ||
      !this.emailNovoCliente ||
      !this.idadeNovoCliente ||
      !this.tipoNovoCliente ||
      !this.statusNovoCliente
    ) {
      this.erroCriacao = 'Preencha todos os campos.';
      return;
    }
    if (Number.isNaN(Number(this.idadeNovoCliente))) {
      this.erroCriacao = 'A idade deve ser um número.';
      return;
    }
    this.erroCriacao = '';

    const novoCliente: CriarCliente = {
      nome: this.nomeNovoCliente,
      email: this.emailNovoCliente,
      idade: Number(this.idadeNovoCliente),
      tipo: this.tipoNovoCliente,
      status: this.statusNovoCliente,
    };

    this.clienteService.criar(novoCliente).subscribe({
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
    this.nomeNovoCliente = '';
    this.emailNovoCliente = '';
    this.idadeNovoCliente = '';
    this.tipoNovoCliente = '';
    this.statusNovoCliente = '';
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

    const idadeConvertida = Number(this.idadeClienteEdicao);

    if (Number.isNaN(idadeConvertida)) {
      return;
    }

    const clienteAtualizado: AtualizarCliente = {
      nome: this.nomeClienteEdicao,
      email: this.emailClienteEdicao,
      idade: idadeConvertida,
      tipo: this.tipoClienteEdicao,
      status: this.statusClienteEdicao,
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

    this.nomeClienteEdicao = cliente.nome;
    this.emailClienteEdicao = cliente.email;
    this.idadeClienteEdicao = String(cliente.idade);
    this.tipoClienteEdicao = cliente.tipo;
    this.statusClienteEdicao = cliente.status;

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
}
