import { Controller, Get } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { Tarefa } from './interfaces/tarefa.interface';

@Controller('tarefas')
export class TarefasController {
    constructor (private readonly tarefasService: TarefasService) {}

    @Get()
    listarTodas(): Tarefa[]{
        return this.tarefasService.listarTodas();
    }
}
