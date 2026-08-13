import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaProduto } from './enums/categoria_produto.enum';
import { PedidoEntity } from 'src/pedidos/pedido.entity';

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

  @OneToMany(() => PedidoEntity, (pedido) => pedido.produto)
  pedidos!: PedidoEntity[];
}
