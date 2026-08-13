import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusCliente } from './enums/status-cliente.enum';
import { TipoCliente } from './enums/tipo-cliente.enum';
import { PedidoEntity } from 'src/pedidos/pedido.entity';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  email!: string;

  @Column()
  idade!: number;

  @Column({ type: 'enum', enum: StatusCliente, default: StatusCliente.ATIVO })
  status!: StatusCliente;

  @Column({ type: 'enum', enum: TipoCliente, default: TipoCliente.PADRAO })
  tipo!: TipoCliente;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.cliente)
  pedidos!: PedidoEntity[];
}
