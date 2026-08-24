import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent {
  @Input() titulo: string = 'Modal';

  @Output() fechar = new EventEmitter<void>();

  aoFechar() {
    this.fechar.emit();
  }
}
