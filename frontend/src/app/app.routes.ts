import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage),
  },

  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () => import('./layouts/app-layout/app-layout').then((m) => m.AppLayout),

    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardPage),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes').then((m) => m.ClientesPage),
      },
      {
        path: 'produtos',
        loadComponent: () => import('./pages/produtos/produtos').then((m) => m.ProdutosPage),
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./pages/pedidos/pedidos').then((m) => m.PedidosPage),
      },
      {
        path: 'tarefas',
        loadComponent: () => import('./pages/tarefas/tarefas').then((m) => m.TarefasPage),
      },
    ],
  },
];
