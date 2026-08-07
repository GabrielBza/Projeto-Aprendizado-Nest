import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import type { Tarefa } from './interfaces/tarefa.interface';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';

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
}
