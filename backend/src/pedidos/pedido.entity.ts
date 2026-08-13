import { ClienteEntity } from '../clientes/cliente.entity';
import { ProdutoEntity } from '../produtos/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusPedido } from './enums/status-pedido.enum';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProdutoEntity)
  produto!: ProdutoEntity;

  @Column()
  quantidade!: number;

  @ManyToOne(() => ClienteEntity)
  cliente!: ClienteEntity;

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.CONFIRMADO,
  })
  status!: StatusPedido;
}
