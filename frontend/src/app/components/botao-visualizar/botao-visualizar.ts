import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-visualizar',
  standalone: true,
  imports: [],
  templateUrl: './botao-visualizar.html',
  styleUrl: './botao-visualizar.css',
})
export class BotaoVisualizarComponent {
  @Output() clicado = new EventEmitter<void>();

  aoClicar() {
    this.clicado.emit();
  }
}
