export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: StatusTarefa;
}

export enum StatusTarefa{
    CONCLUIDA = "CONCLUIDA",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    PENDENTE = "PENDENTE"
}
