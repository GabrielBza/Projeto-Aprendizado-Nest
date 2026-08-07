import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import type { Tarefa } from './interfaces/tarefa.interface';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';
import { AtualizarTarefaDto } from './dtos/atualizar-tarefa-dto';

@Controller('tarefas')
export class TarefasController {
    constructor (private readonly tarefasService: TarefasService) {}

    @Get()
    listarTodas(): Tarefa[]{
        return this.tarefasService.listarTodas();
    }

    @Get(":id")
    buscarPorId(@Param("id") id:string): Tarefa{
        return this.tarefasService.buscarPorId(Number(id));
    }

    @Post()
    criar(@Body() dados: CriarTarefaDto): Tarefa{
        return this.tarefasService.criar(dados);
    }

    @Patch(":id")
    atualizar(@Param("id") id:string, @Body() dados:AtualizarTarefaDto): Tarefa{
        return this.tarefasService.atualizar(Number(id), dados);
    }

    @Delete(":id")
    deletar(@Param("id") id:string){
        return this.tarefasService.deletar(Number(id))
    }
}
