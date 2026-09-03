import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUsuario } from './enums/tipo-usuario.enum';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  senha!: string;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.USER,
  })
  role!: TipoUsuario;
}
