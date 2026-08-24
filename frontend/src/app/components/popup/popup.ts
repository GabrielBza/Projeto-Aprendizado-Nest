import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoComponent } from '../botao/botao';

@Component({
  selector: 'app-popup-dialog',
  imports: [BotaoComponent],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class PopUpComponent {
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  aoConfirmar() {
    this.confirmar.emit();
  }

  aoCancelar() {
    this.cancelar.emit();
  }
}
