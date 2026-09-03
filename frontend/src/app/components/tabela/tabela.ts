import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoEditarComponent } from '../botao-editar/botao-editar';
import { BotaoDeletarComponent } from '../botao-deletar/botao-deletar';
import { BotaoVisualizarComponent } from '../botao-visualizar/botao-visualizar';
import { TagComponent } from '../tag/tag';
import { TipoTag } from '../tag/tag';

export interface ColunaTabela {
  titulo: string;
  campo: string;
  mostrarComoTag?: boolean;

  tipoTag?: (valor: any) => TipoTag;
  textoTag?: (valor: any) => string;

  largura?: string;
  truncar?: boolean;
}

export interface LinhaTabela {
  id: number;
}

@Component({
  selector: 'app-tabela',
  imports: [BotaoEditarComponent, BotaoDeletarComponent, BotaoVisualizarComponent, TagComponent],
  templateUrl: './tabela.html',
  styleUrl: './tabela.css',
})
export class TabelaComponent {
  @Input() colunas: ColunaTabela[] = [];

  @Input() dados: LinhaTabela[] = [];

  @Input() mostrarBotoes: boolean = false;
  @Input() mostrarVisualizar: boolean = false;

  @Output() editar = new EventEmitter<number>();
  @Output() deletar = new EventEmitter<number>();
  @Output() visualizar = new EventEmitter<number>();

  valorCelula(linha: LinhaTabela, campo: string) {
    return campo.split('.').reduce((valor, chave) => Reflect.get(valor, chave), linha);
  }

  aoEditar(id: number) {
    this.editar.emit(id);
  }
  aoDeletar(id: number) {
    this.deletar.emit(id);
  }

  aoVisualizar(id: number) {
    this.visualizar.emit(id);
  }

  tipoDaTag(linha: LinhaTabela, coluna: ColunaTabela): TipoTag {
    const valor = this.valorCelula(linha, coluna.campo);

    return coluna.tipoTag!(valor);
  }

  textoDaTag(linha: LinhaTabela, coluna: ColunaTabela) {
    const valor = this.valorCelula(linha, coluna.campo);

    if (coluna.textoTag) {
      return coluna.textoTag(valor);
    }

    return '';
  }
}
