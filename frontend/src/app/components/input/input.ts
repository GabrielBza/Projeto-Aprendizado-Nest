import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() valor: string | number = '';
  @Input() tipo: string = 'text';

  @Output() trocaValor = new EventEmitter<string>();

  aoDigitar(event: Event) {
    const input = event.target as HTMLInputElement;

    this.trocaValor.emit(input.value);
  }
}
