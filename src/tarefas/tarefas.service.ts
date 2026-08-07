import { Injectable } from '@nestjs/common';
import { Tarefa, StatusTarefa } from './interfaces/tarefa.interface';

@Injectable()
export class TarefasService {
    private tarefas: Tarefa[] = [
        {
            id: 1,
            titulo: 'Estudar NestJS',
            descricao: 'Desenvolver uma pequena e simples aplicação em NestJS para entender a arquitetura e os conceitos do framework.',
            status: StatusTarefa.EM_ANDAMENTO
        },
        {
            id: 2,
            titulo: 'Adicionar Swagger a API',
            descricao: 'Instalar, configurar e rodar o Swagger na API.',
            status: StatusTarefa.CONCLUIDA
        },
        {
            id: 3,
            titulo: 'Estudar Angular',
            descricao: 'Desenvolver um pequeno e simples projeto frontend em Angular para entender a arquitetura e os conceitos do framework.',
            status: StatusTarefa.PENDENTE
        }
    ]

    listarTodas(): Tarefa[]{
        return this.tarefas;
    }
}
