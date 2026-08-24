import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { CriarCliente } from '../models/cliente/criar-cliente';
import { AtualizarCliente } from '../models/cliente/AtualizarCliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  listar(nome?: string): Observable<Cliente[]> {
    if (nome && nome.trim() !== '') {
      return this.http.get<Cliente[]>(`${this.apiUrl}?nome=${encodeURIComponent(nome)}`);
    }

    return this.http.get<Cliente[]>(this.apiUrl);
  }

  criar(cliente: CriarCliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, cliente: AtualizarCliente): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }
}
