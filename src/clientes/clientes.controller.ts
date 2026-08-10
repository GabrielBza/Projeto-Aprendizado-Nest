import { Controller, Get } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './interfaces/cliente.interface';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  listarTodos(): Cliente[] {
    return this.clientesService.listarTodos();
  }
}
