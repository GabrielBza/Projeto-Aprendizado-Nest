import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import type { Cliente } from './interfaces/cliente.interface';
import { CriarClienteDto } from './dtos/criar-cliente-dto';

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

  @Post()
  criar(@Body() dados: CriarClienteDto): Cliente {
    return this.clientesService.criar(dados);
  }
}
