import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';
import { CriarClienteDto } from './dtos/criar-cliente-dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente-dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiQuery({
    name: 'nome',
    required: false,
    type: String,
  })
  @Get()
  listar(@Query('nome') nome?: string): Promise<ClienteEntity[]> {
    return this.clientesService.listar(nome);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<ClienteEntity> {
    return this.clientesService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: CriarClienteDto): Promise<ClienteEntity> {
    return this.clientesService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarClienteDto,
  ): Promise<ClienteEntity> {
    return this.clientesService.atualizar(id, dados);
  }

  @Delete(':id')
  deletar(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.deletar(id);
  }
}
