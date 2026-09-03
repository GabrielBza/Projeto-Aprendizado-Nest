import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ROLES_KEY } from './decorators/roles.decorator';
import { TipoUsuario } from '../usuarios/enums/tipo-usuario.enum';
import { JwtPayload } from './dtos/jwt-payload';

interface RequestComUsuario extends Request {
  user?: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitidas = this.reflector.getAllAndOverride<TipoUsuario[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesPermitidas) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestComUsuario>();

    const usuario = request.user;

    if (!usuario) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    if (!rolesPermitidas.includes(usuario.role)) {
      throw new ForbiddenException('Usuário sem permissão');
    }

    return true;
  }
}
