import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contador } from '../models/dashboard/contador';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiURL = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  contarTudo(): Observable<Contador[]> {
    return this.http.get<Contador[]>(this.apiURL);
  }

  tarefasPorStatus(): Observable<Contador[]> {
    return this.http.get<Contador[]>(`${this.apiURL}/tarefasPorStatus`);
  }

  produtosPorCategoria(): Observable<Contador[]> {
    return this.http.get<Contador[]>(`${this.apiURL}/produtosPorCategoria`);
  }

  clientesPorStatus(): Observable<Contador[]> {
    return this.http.get<Contador[]>(`${this.apiURL}/clientesPorStatus`);
  }
}
