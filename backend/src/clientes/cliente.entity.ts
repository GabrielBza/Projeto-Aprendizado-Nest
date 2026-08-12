import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusCliente } from './enums/status-cliente.enum';
import { TipoCliente } from './enums/tipo-cliente.enum';

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

  @Column({ default: 'ATIVO', type: 'enum', enum: StatusCliente })
  status!: StatusCliente;

  @Column({ type: 'enum', enum: TipoCliente })
  tipo!: TipoCliente;
}
