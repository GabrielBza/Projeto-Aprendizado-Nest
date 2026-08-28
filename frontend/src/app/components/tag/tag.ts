import { Component, Input } from '@angular/core';

export type TipoTag =
  | 'concluida'
  | 'em_andamento'
  | 'pendente'
  | 'eletronico'
  | 'alimento'
  | 'roupa'
  | 'brinquedo'
  | 'higiene'
  | 'em_analise'
  | 'entregue'
  | 'a_caminho'
  | 'atrasado'
  | 'cancelado'
  | 'confirmado'
  | 'ativo'
  | 'inativo'
  | 'padrao'
  | 'premium'
  | 'empresarial'
  | 'disponivel'
  | 'indisponivel';
@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class TagComponent {
  @Input() texto: string = 'Tag';

  @Input() tipo!: TipoTag;
}
