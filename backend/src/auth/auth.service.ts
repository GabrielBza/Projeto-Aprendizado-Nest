import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dtos/login.dto';
import { TipoUsuario } from '../usuarios/enums/tipo-usuario.enum';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; role: TipoUsuario }> {
    const usuario = await this.usuariosService.buscarPorEmail(dto.email);

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida: boolean = await bcrypt.compare(dto.senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      role: usuario.role,
    };
  }
}
