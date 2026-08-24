import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BotaoComponent } from '../botao/botao';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BotaoComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Output() sair = new EventEmitter<void>();

  aoSair() {
    this.sair.emit();
  }
}
