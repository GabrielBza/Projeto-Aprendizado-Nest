import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import type { Cliente } from './interfaces/cliente.interface';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  listarTodos(): Cliente[] {
    return this.clientesService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string): Cliente {
    return this.clientesService.buscarPorId(Number(id));
  }
}
