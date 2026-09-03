import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';

import { CardComponent } from '../../components/card/card';
import { BotaoComponent } from '../../components/botao/botao';
import { InputComponent } from '../../components/input/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CardComponent, BotaoComponent, InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  email = '';
  senha = '';
  erro = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  entrar() {
    this.erro.set('');

    this.authService
      .login({
        email: this.email,
        senha: this.senha,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },

        error: (erro) => {
          this.erro.set(erro.error?.message || 'Erro ao realizar login');
        },
      });
  }
}
