export interface CadastroUsuario {
  nome: string;
  email: string;
  senha: string;
  role: 'USER' | 'ADMIN';
}
