import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoComponent } from '../botao/botao';

@Component({
  selector: 'app-popup-dialog',
  imports: [BotaoComponent],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class PopUpComponent {
  @Input() titulo: string = 'Confirmar exclusão';
  @Input() mensagem: string = 'Deseja realmente excluir este item?';
  @Input() textoConfirmar: string = 'Excluir';
  @Input() tipoConfirmar: 'primario' | 'secundario' | 'perigo' = 'perigo';

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  aoConfirmar() {
    this.confirmar.emit();
  }

  aoCancelar() {
    this.cancelar.emit();
  }
}
