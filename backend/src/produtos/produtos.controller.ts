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
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutoEntity } from './produto.entity';
import { CriarProdutoDto } from './dtos/criar-produto-dto';
import { AtualizarProdutoDto } from './dtos/atualizar-produto-dto';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TipoUsuario } from '../usuarios/enums/tipo-usuario.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiQuery({
    name: 'nome',
    required: false,
    type: String,
  })
  @Get()
  listar(@Query('nome') nome?: string): Promise<ProdutoEntity[]> {
    return this.produtosService.listar(nome);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<ProdutoEntity> {
    return this.produtosService.buscarPorId(id);
  }

  @Roles(TipoUsuario.ADMIN)
  @Post()
  criar(@Body() dados: CriarProdutoDto): Promise<ProdutoEntity> {
    return this.produtosService.criar(dados);
  }

  @Roles(TipoUsuario.ADMIN)
  @Patch(':id')
  atualiar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarProdutoDto,
  ): Promise<ProdutoEntity> {
    return this.produtosService.atualizar(id, dados);
  }

  @Roles(TipoUsuario.ADMIN)
  @Delete(':id')
  deletar(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.deletar(id);
  }
}
