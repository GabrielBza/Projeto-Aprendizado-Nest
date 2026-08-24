import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-editar',
  standalone: true,
  imports: [],
  templateUrl: './botao-editar.html',
  styleUrl: './botao-editar.css',
})
export class BotaoEditarComponent {
  @Output() clicado = new EventEmitter<void>();

  aoClicar() {
    this.clicado.emit();
  }
}
