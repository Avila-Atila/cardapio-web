import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent() {
      return import('./pages/home/home.component').then((x) => x.HomeComponent);
    },
  },
  {
    path: 'cardapio',
    pathMatch: 'full',
    canActivate: [adminGuard],
    loadComponent() {
      return import('./pages/cardapio/cardapio.component').then(
        (x) => x.CardapioComponent
      );
    },
  },
  {
    path: 'usuarios',

    pathMatch: 'full',
    canActivate: [adminGuard],
    loadComponent() {
      return import('./pages/users/users.component').then(
        (x) => x.UsersComponent
      );
    },
  },
  {
    path: 'pedidos',
    pathMatch: 'full',
    canActivate: [adminGuard],
    loadComponent() {
      return import('./pages/pedidos/pedidos.component').then(
        (x) => x.PedidosComponent
      );
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
