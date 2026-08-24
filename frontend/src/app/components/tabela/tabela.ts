import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoEditarComponent } from '../botao-editar/botao-editar';
import { BotaoDeletarComponent } from '../botao-deletar/botao-deletar';

export interface ColunaTabela {
  titulo: string;
  campo: string;
}

export interface LinhaTabela {
  id: number;
}

@Component({
  selector: 'app-tabela',
  imports: [BotaoEditarComponent, BotaoDeletarComponent],
  templateUrl: './tabela.html',
  styleUrl: './tabela.css',
})
export class TabelaComponent {
  @Input() colunas: ColunaTabela[] = [];

  @Input() dados: LinhaTabela[] = [];

  @Input() mostrarBotoes: boolean = false;

  @Output() editar = new EventEmitter<number>();
  @Output() deletar = new EventEmitter<number>();

  valorCelula(linha: LinhaTabela, campo: string): string | number | boolean | null | undefined {
    return Reflect.get(linha, campo);
  }

  aoEditar(id: number) {
    this.editar.emit(id);
  }
  aoDeletar(id: number) {
    this.deletar.emit(id);
  }
}
