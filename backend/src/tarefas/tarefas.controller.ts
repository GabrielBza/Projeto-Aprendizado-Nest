import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';
import { AtualizarTarefaDto } from './dtos/atualizar-tarefa-dto';
import { TarefaEntity } from './tarefa.entity';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  listarTodas(): Promise<TarefaEntity[]> {
    return this.tarefasService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<TarefaEntity> {
    return this.tarefasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: CriarTarefaDto): Promise<TarefaEntity> {
    return this.tarefasService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarTarefaDto,
  ): Promise<TarefaEntity> {
    return this.tarefasService.atualizar(id, dados);
  }

  @Delete(':id')
  deletar(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.deletar(id);
  }
}
