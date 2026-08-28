import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao',
  imports: [],
  templateUrl: './botao.html',
  styleUrl: './botao.css',
})
export class BotaoComponent {
  @Input() texto: string = 'Botão';

  @Input() tipo: 'primario' | 'secundario' | 'cinza' | 'perigo' = 'primario';

  @Input() desabilitado: boolean = false;

  @Output() clicado = new EventEmitter<void>();

  aoClicar() {
    this.clicado.emit();
  }
}
