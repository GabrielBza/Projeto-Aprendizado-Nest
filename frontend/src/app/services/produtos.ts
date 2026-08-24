import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto/produto';
import { CriarProduto } from '../models/produto/criar-produto';
import { AtualizarProduto } from '../models/produto/atualizar-produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  listar(nome?: string): Observable<Produto[]> {
    if (nome && nome.trim() !== '') {
      return this.http.get<Produto[]>(`${this.apiUrl}?nome=${encodeURIComponent(nome)}`);
    }
    return this.http.get<Produto[]>(this.apiUrl);
  }

  criar(produto: CriarProduto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  editar(id: number, produto: AtualizarProduto): Observable<Produto> {
    return this.http.patch<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
