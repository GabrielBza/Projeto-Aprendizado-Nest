import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidoEntity } from './pedido.entity';
import { AtualizarPedidoDto } from './dtos/atualizar-pedido.dto';
import { CriarPedidoDto } from './dtos/criar-pedido.dto';
import { PedidoResumidoDto } from './dtos/pedido-resumido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  listarTodos(): Promise<PedidoResumidoDto[]> {
    return this.pedidosService.listarTodos();
  }

  @Get('produto/:produtoId')
  listarPorProduto(
    @Param('produtoId', ParseIntPipe) produtoId: number,
  ): Promise<PedidoResumidoDto[]> {
    return this.pedidosService.listarPorProduto(produtoId);
  }

  @Get('cliente/:clienteId')
  listarPorCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ): Promise<PedidoResumidoDto[]> {
    return this.pedidosService.listarPorCliente(clienteId);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<PedidoEntity> {
    return this.pedidosService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: CriarPedidoDto): Promise<PedidoEntity> {
    return this.pedidosService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarPedidoDto,
  ): Promise<PedidoEntity> {
    return this.pedidosService.atualizar(id, dados);
  }

  @Delete(':id')
  deletar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ mensagem: string; pedido: PedidoEntity }> {
    return this.pedidosService.deletar(id);
  }
}
