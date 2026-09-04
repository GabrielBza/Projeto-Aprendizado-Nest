import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoResumido, ProdutoPedidoResumido } from '../models/pedido/pedido-resumido';
import { PedidoDetalhado } from '../models/pedido/pedido-detalhado';
import { CriarPedido } from '../models/pedido/criar-pedido';
import { AtualizarPedido } from '../models/pedido/atualizar-pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = '/api/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<PedidoResumido[]> {
    return this.http.get<PedidoResumido[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<PedidoDetalhado> {
    return this.http.get<PedidoDetalhado>(`${this.apiUrl}/${id}`);
  }

  criar(pedido: CriarPedido): Observable<PedidoResumido> {
    return this.http.post<PedidoResumido>(this.apiUrl, pedido);
  }

  editar(id: number, pedido: AtualizarPedido): Observable<PedidoResumido> {
    return this.http.patch<PedidoResumido>(`${this.apiUrl}/${id}`, pedido);
  }

  deletar(id: number) {
    return this.http.delete<ProdutoPedidoResumido>(`${this.apiUrl}/${id}`);
  }
}
