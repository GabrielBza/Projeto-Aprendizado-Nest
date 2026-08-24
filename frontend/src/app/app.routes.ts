import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
