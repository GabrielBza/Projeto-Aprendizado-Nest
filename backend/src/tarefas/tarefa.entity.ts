import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusTarefa } from './enums/status-tarefa.enum';

@Entity('tarefas')
export class TarefaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column({ type: 'enum', enum: StatusTarefa, default: StatusTarefa.PENDENTE })
  status!: StatusTarefa;
}
