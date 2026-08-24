import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() valor: string = '';

  @Output() trocaValor = new EventEmitter<string>();

  aoSelecionar(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.trocaValor.emit(select.value);
  }
}
