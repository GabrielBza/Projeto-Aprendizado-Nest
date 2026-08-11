import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusTarefa } from './interfaces/tarefa.interface';

@Entity('tarefas')
export class TarefaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column({ type: 'enum', enum: StatusTarefa })
  status!: StatusTarefa;
}
