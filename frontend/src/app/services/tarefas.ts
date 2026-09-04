import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefas/tarefa';
import { CriarTarefa } from '../models/tarefas/criar-tarefa';
import { AtualizarTarefa } from '../models/tarefas/atualizar-tarefa';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private apiUrl = '/api/tarefas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  criar(tarefa: CriarTarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  editar(id: number, tarefa: AtualizarTarefa): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  avancarStatus(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}/avancar`, {});
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
