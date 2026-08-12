import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaProduto } from './enums/categoria_produto.enum';

@Entity('produtos')
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column()
  preco!: number;

  @Column({ type: 'enum', enum: CategoriaProduto })
  categoria!: CategoriaProduto;

  @Column({ default: true })
  disponivel!: boolean;
}
