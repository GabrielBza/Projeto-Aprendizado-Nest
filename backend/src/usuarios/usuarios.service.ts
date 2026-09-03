import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuarios.entity';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuariosRepository: Repository<UsuarioEntity>,
  ) {}

  async criar(usuarioInput: CriarUsuarioDto): Promise<{ mensagem: string }> {
    const senhaHash = await bcrypt.hash(usuarioInput.senha, 10);

    const usuarioFinal = this.usuariosRepository.create({
      nome: usuarioInput.nome,
      email: usuarioInput.email,
      senha: senhaHash,
      role: usuarioInput.role,
    });

    await this.usuariosRepository.save(usuarioFinal);

    return { mensagem: 'Usuário criado com sucesso!' };
  }

  async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
    return this.usuariosRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
