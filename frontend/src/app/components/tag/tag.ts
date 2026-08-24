import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class TagComponent {
  @Input() texto: string = 'Tag';

  @Input() tipo:
    | 'concluida'
    | 'em_andamento'
    | 'pendente'
    | 'eletronico'
    | 'alimento'
    | 'roupa'
    | 'brinquedo'
    | 'higiene'
    | 'entregue'
    | 'a_caminho'
    | 'atrasado'
    | 'cancelado'
    | 'confirmado'
    | 'ativo'
    | 'inativo'
    | 'padrao'
    | 'premium'
    | 'empresarial' = 'padrao';
}
