import { Component, OnInit, signal } from '@angular/core';
import { ColunaTabela, TabelaComponent } from '../../components/tabela/tabela';
import { PedidosService } from '../../services/pedidos';
import { PedidoResumido } from '../../models/pedido/pedido-resumido';
import { PedidoDetalhado } from '../../models/pedido/pedido-detalhado';
import { StatusPedido } from '../../enums/pedidos/status-pedido.enum';
import { ModalComponent } from '../../components/modal/modal';
import { TagComponent } from '../../components/tag/tag';
import {
  tipoTagStatusPedido,
  textoTagStatusPedido,
  tipoTagStatusCliente,
  textoTagStatusCliente,
  tipoTagTipoCliente,
  textoTagTipoCliente,
  tipoTagCategoriaProduto,
  textoTagCategoriaProduto,
  tipoTagDisponibilidadeProduto,
  textoTagDisponibilidadeProduto,
} from '../../utils/tag-formatter';
import { BotaoComponent } from '../../components/botao/botao';
import { PopUpComponent } from '../../components/popup/popup';
import { ProdutoService } from '../../services/produtos';
import { ClienteService } from '../../services/clientes';
import { Cliente } from '../../models/cliente/cliente';
import { Produto } from '../../models/produto/produto';
import { SelectComponent } from '../../components/select/select';
import { InputComponent } from '../../components/input/input';
import { AtualizarPedido } from '../../models/pedido/atualizar-pedido';
import { CriarPedido } from '../../models/pedido/criar-pedido';

@Component({
  selector: 'app-pedidos',
  imports: [
    TabelaComponent,
    ModalComponent,
    TagComponent,
    BotaoComponent,
    PopUpComponent,
    SelectComponent,
    InputComponent,
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class PedidosPage implements OnInit {
  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClienteService,
    private produtosService: ProdutoService,
  ) {}

  clientes = signal<Cliente[]>([]);
  produtos = signal<Produto[]>([]);
  pedidos = signal<PedidoResumido[]>([]);

  StatusPedido = StatusPedido;

  pedidoSelecionado = signal<PedidoDetalhado | null>(null);

  popupExclusaoAberto = signal(false);
  modalDetalhesAberto = signal(false);
  modalEdicaoAberto = signal(false);
  modalCriacaoAberto = signal(false);

  colunas: ColunaTabela[] = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'Cliente', campo: 'cliente.nome' },
    { titulo: 'Produto', campo: 'produto.nome' },
    { titulo: 'Quantidade', campo: 'quantidade' },
    {
      titulo: 'Status',
      campo: 'status',
      mostrarComoTag: true,
      tipoTag: tipoTagStatusPedido,
      textoTag: textoTagStatusPedido,
    },
  ];

  tipoTagStatusPedido = tipoTagStatusPedido;
  textoTagStatusPedido = textoTagStatusPedido;

  tipoTagStatusCliente = tipoTagStatusCliente;
  textoTagStatusCliente = textoTagStatusCliente;

  tipoTagTipoCliente = tipoTagTipoCliente;
  textoTagTipoCliente = textoTagTipoCliente;

  tipoTagCategoriaProduto = tipoTagCategoriaProduto;
  textoTagCategoriaProduto = textoTagCategoriaProduto;

  tipoTagDisponibilidadeProduto = tipoTagDisponibilidadeProduto;
  textoTagDisponibilidadeProduto = textoTagDisponibilidadeProduto;

  pedidoIdModal: number | null = null;
  clienteIdModal: number | null = null;
  produtoIdModal: number | null = null;
  quantidadeModal: number | null = null;
  statusModal: StatusPedido | '' = '';

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarPedidos() {
    this.pedidosService.listar().subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
      },

      error: (erro) => {
        console.error('Erro ao buscar pedidos:', erro);
      },
    });
  }

  carregarClientes() {
    this.clientesService.listar().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
      },

      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
      },
    });
  }

  carregarProdutos() {
    this.produtosService.listar().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
      },

      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      },
    });
  }

  abrirDetalhes(id: number) {
    this.pedidosService.buscarPorId(id).subscribe({
      next: (pedido) => {
        this.pedidoSelecionado.set(pedido);
        this.modalDetalhesAberto.set(true);
      },

      error: (erro) => {
        console.error('Erro ao buscar detalhes do pedido:', erro);
      },
    });
  }

  fecharDetalhes() {
    this.modalDetalhesAberto.set(false);
    this.pedidoSelecionado.set(null);
  }

  criarPedido() {
    if (
      this.clienteIdModal === null ||
      this.produtoIdModal === null ||
      this.quantidadeModal === null
    ) {
      return;
    }

    if (this.quantidadeModal <= 0) {
      return;
    }

    const dados: CriarPedido = {
      clienteId: this.clienteIdModal,
      produtoId: this.produtoIdModal,
      quantidade: this.quantidadeModal,
    };

    this.pedidosService.criar(dados).subscribe({
      next: () => {
        this.fecharCriacao();
        this.carregarPedidos();
      },

      error: (erro) => {
        console.error('Erro ao criar pedido:', erro);
      },
    });
  }

  abrirCriacao() {
    this.modalCriacaoAberto.set(true);
  }

  fecharCriacao() {
    this.modalCriacaoAberto.set(false);

    this.clienteIdModal = null;
    this.produtoIdModal = null;
    this.quantidadeModal = null;
  }

  salvarEdicao() {
    if (
      this.pedidoIdModal === null ||
      this.clienteIdModal === null ||
      this.produtoIdModal === null ||
      this.quantidadeModal === null ||
      !this.statusModal
    ) {
      return;
    }

    if (this.quantidadeModal <= 0) {
      return;
    }

    const id = this.pedidoIdModal;

    const dados: AtualizarPedido = {
      clienteId: this.clienteIdModal,
      produtoId: this.produtoIdModal,
      quantidade: this.quantidadeModal,
      status: this.statusModal,
    };

    this.pedidosService.editar(id, dados).subscribe({
      next: () => {
        this.fecharEdicao();
        this.carregarPedidos();
        this.abrirDetalhes(id);
      },

      error: (erro) => {
        console.error('Erro ao editar pedido:', erro);
      },
    });
  }

  abrirEdicao() {
    const pedido = this.pedidoSelecionado();

    if (!pedido) {
      return;
    }

    this.pedidoIdModal = pedido.id;
    this.clienteIdModal = pedido.cliente.id;
    this.produtoIdModal = pedido.produto.id;
    this.quantidadeModal = pedido.quantidade;
    this.statusModal = pedido.status;

    this.fecharDetalhes();
    this.modalEdicaoAberto.set(true);
  }

  fecharEdicao() {
    this.modalEdicaoAberto.set(false);

    this.pedidoIdModal = null;
    this.clienteIdModal = null;
    this.produtoIdModal = null;
    this.quantidadeModal = null;
    this.statusModal = '';
  }

  alterarStatusEdicao(valor: string) {
    this.statusModal = valor as StatusPedido;
  }

  excluirPedido() {
    const pedido = this.pedidoSelecionado();

    if (!pedido) {
      return;
    }

    this.pedidosService.deletar(pedido.id).subscribe({
      next: () => {
        this.alterarExclusao(false);
        this.fecharDetalhes();
        this.carregarPedidos();
      },

      error: (erro) => {
        console.error('Erro ao excluir pedido:', erro);
      },
    });
  }

  alterarExclusao(aberto: boolean) {
    this.popupExclusaoAberto.set(aberto);
  }
}
