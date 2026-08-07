import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import type { Produto } from './interfaces/produto.interface';
import { CriarProdutoDto } from './dtos/criar-produto-dto';
import { AtualizarProdutoDto } from './dtos/atualizar-produto-dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  listarTodos(): Produto[] {
    return this.produtosService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string): Produto {
    return this.produtosService.buscarPorId(Number(id));
  }

  @Post()
  criar(@Body() dados: CriarProdutoDto): Produto {
    return this.produtosService.criar(dados);
  }
}
