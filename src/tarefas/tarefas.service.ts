import { Injectable, NotFoundException } from '@nestjs/common';
import { Tarefa, StatusTarefa } from './interfaces/tarefa.interface';
import { CriarTarefaDto } from './dtos/criar-tarefa-dto';

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

    buscarPorId(id: number): Tarefa{
        const tarefa = this.tarefas.find((tarefa) => tarefa.id === id);

        if (!tarefa){
            throw new NotFoundException("Tarefa não encontrada");
        }
        
        return tarefa;
    }

    criar(dados:CriarTarefaDto): Tarefa{
        const novaTarefa: Tarefa = {
            id: this.tarefas.length + 1,
            titulo: dados.titulo,
            descricao: dados.descricao,
            status: dados.status
        };

        this.tarefas.push(novaTarefa);

        return novaTarefa;
    }
}
