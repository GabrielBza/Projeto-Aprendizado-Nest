import { Component, OnInit, signal } from '@angular/core';
import { ColunaTabela, TabelaComponent } from '../../components/tabela/tabela';
import { BotaoComponent } from '../../components/botao/botao';
import { InputComponent } from '../../components/input/input';
import { Produto } from '../../models/produto/produto';
import { ProdutoService } from '../../services/produtos';
import { ModalComponent } from '../../components/modal/modal';
import { SelectComponent } from '../../components/select/select';
import { CriarProduto } from '../../models/produto/criar-produto';
import { AtualizarProduto } from '../../models/produto/atualizar-produto';
import { PopUpComponent } from '../../components/popup/popup';
import { CategoriaProduto } from '../../enums/produtos/categoria-produto.enum';
import { TipoTag } from '../../components/tag/tag';
import {
  tipoTagCategoriaProduto,
  textoTagCategoriaProduto,
  tipoTagDisponibilidadeProduto,
  textoTagDisponibilidadeProduto,
} from '../../utils/tag-formatter';

@Component({
  selector: 'app-produtos',
  imports: [
    TabelaComponent,
    BotaoComponent,
    InputComponent,
    ModalComponent,
    SelectComponent,
    PopUpComponent,
  ],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class ProdutosPage implements OnInit {
  constructor(private produtoService: ProdutoService) {}

  produtos = signal<Produto[]>([]);

  erro: string = '';

  CategoriaProduto = CategoriaProduto;

  modalCriacaoAberto: boolean = false;
  modalEdicaoAberto: boolean = false;
  popupDelecaoAberto: boolean = false;
  produtoSelecionadoId: number | null = null;

  colunas: ColunaTabela[] = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'Nome', campo: 'nome' },
    { titulo: 'Descrição', campo: 'descricao' },
    { titulo: 'Preço', campo: 'preco' },

    {
      titulo: 'Categoria',
      campo: 'categoria',
      mostrarComoTag: true,
      tipoTag: tipoTagCategoriaProduto,
      textoTag: textoTagCategoriaProduto,
    },

    {
      titulo: 'Disponível',
      campo: 'disponivel',
      mostrarComoTag: true,
      tipoTag: tipoTagDisponibilidadeProduto,
      textoTag: textoTagDisponibilidadeProduto,
    },
  ];

  modalNomeProduto: string = '';
  modalDescricaoProduto: string = '';
  modalPrecoProduto: string = '';
  modalCategoriaProduto: CategoriaProduto | '' = '';
  modalDisponivelProduto: boolean = true;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
      },

      error: (erro) => {
        console.error('Erro ao buscar produtos.');
      },
    });
  }

  buscarProdutos(nome: string) {
    this.produtoService.listar(nome).subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      },
    });
  }

  alterarDisponibilidade(event: Event) {
    const checkbox = event.target as HTMLInputElement;

    this.modalDisponivelProduto = checkbox.checked;
  }

  criarProduto() {
    if (
      !this.modalNomeProduto ||
      !this.modalDescricaoProduto ||
      !this.modalPrecoProduto ||
      !this.modalCategoriaProduto
    ) {
      this.erro = 'Preencha todos os campos.';
      return;
    }
    if (Number.isNaN(Number(this.modalPrecoProduto))) {
      this.erro = 'O preco deve ser um número';
    }
    this.erro = '';

    const novoProduto: CriarProduto = {
      nome: this.modalNomeProduto,
      descricao: this.modalDescricaoProduto,
      preco: Number(this.modalPrecoProduto),
      categoria: this.modalCategoriaProduto,
      disponivel: this.modalDisponivelProduto,
    };

    this.produtoService.criar(novoProduto).subscribe({
      next: (produtoCriado) => {
        const produtosAtuais = this.produtos();

        const novaLista = [...produtosAtuais, produtoCriado];

        this.produtos.set(novaLista);
        this.alterarModal('criacao', false);
      },

      error: (erro) => {
        console.error('Erro ao criar cliente:', erro);
      },
    });
    this.modalNomeProduto = '';
    this.modalDescricaoProduto = '';
    this.modalPrecoProduto = '';
    this.modalCategoriaProduto = '';
    this.modalDisponivelProduto = true;
  }

  editarProduto() {
    if (this.produtoSelecionadoId === null) {
      return;
    }

    const precoNumber: number = Number(this.modalPrecoProduto);

    if (Number.isNaN(precoNumber)) {
      return;
    }

    if (!this.modalCategoriaProduto) {
      return;
    }

    const produtoAtualizado: AtualizarProduto = {
      nome: this.modalNomeProduto,
      descricao: this.modalDescricaoProduto,
      preco: precoNumber,
      categoria: this.modalCategoriaProduto,
      disponivel: this.modalDisponivelProduto,
    };

    const id = this.produtoSelecionadoId;

    this.produtoService.editar(id, produtoAtualizado).subscribe({
      next: (produtoBack) => {
        const produtosAtuais = this.produtos();

        const novaLista = produtosAtuais.map((produto) => {
          if (produto.id === id) {
            return produtoBack;
          }

          return produto;
        });

        this.produtos.set(novaLista);

        this.alterarModal('edicao', false);

        this.produtoSelecionadoId = null;
      },

      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
      },
    });
  }

  abrirEdicao(id: number) {
    const produto = this.produtos().find((produto) => produto.id === id);
    if (!produto) {
      return;
    }
    this.produtoSelecionadoId = id;

    this.modalNomeProduto = produto.nome;
    this.modalDescricaoProduto = produto.descricao;
    this.modalPrecoProduto = String(produto.preco);
    this.modalCategoriaProduto = produto.categoria;
    this.modalDisponivelProduto = produto.disponivel;

    this.alterarModal('edicao', true);
  }

  deletarProduto() {
    if (this.produtoSelecionadoId === null) {
      return;
    }

    const id = this.produtoSelecionadoId;

    this.produtoService.deletar(id).subscribe({
      next: () => {
        const produtosAtuais = this.produtos();
        const novaLista = produtosAtuais.filter((produto) => produto.id !== id);

        this.produtos.set(novaLista);
        this.alterarPopUp(false);
        this.produtoSelecionadoId = null;
      },

      error: (erro) => {
        console.error('Erro ao deletar produto:', erro);
      },
    });
  }

  abrirDelecao(id: number) {
    this.produtoSelecionadoId = id;
    this.alterarPopUp(true);
  }

  alterarModal(tipo: 'criacao' | 'edicao', aberto: boolean) {
    if (tipo === 'criacao') {
      this.modalCriacaoAberto = aberto;
    }
    if (tipo === 'edicao') {
      this.modalEdicaoAberto = aberto;
    }
  }

  alterarPopUp(aberto: boolean) {
    this.popupDelecaoAberto = aberto;
  }

  alterarCategoriaProduto(valor: string) {
    this.modalCategoriaProduto = valor as CategoriaProduto;
  }
}
