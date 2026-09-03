import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { CadastroUsuario } from '../models/auth/cadastro-usuario.model';
import { LoginUsuario } from '../models/auth/login-usuario.model';
import { LoginResponse } from '../models/auth/login-response.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/auth/jwt-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: CadastroUsuario): Observable<{ mensagem: string }> {
    return this.http.post<{ mensagem: string }>(`${this.apiUrl}/usuarios`, usuario);
  }

  login(usuario: LoginUsuario): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, usuario).pipe(
      tap((resposta) => {
        localStorage.setItem('token', resposta.access_token);
        localStorage.setItem('role', resposta.role);
      }),
    );
  }

  obterRole(): 'USER' | 'ADMIN' | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = jwtDecode<JwtPayload>(token);

      return payload.role;
    } catch {
      return null;
    }
  }

  eAdmin(): boolean {
    return this.obterRole() === 'ADMIN';
  }
}
