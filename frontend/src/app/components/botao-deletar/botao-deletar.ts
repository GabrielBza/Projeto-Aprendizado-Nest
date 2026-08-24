import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-deletar',
  standalone: true,
  imports: [],
  templateUrl: './botao-deletar.html',
  styleUrl: './botao-deletar.css',
})
export class BotaoDeletarComponent {
  @Output() clicado = new EventEmitter<void>();

  aoClicar() {
    this.clicado.emit();
  }
}
