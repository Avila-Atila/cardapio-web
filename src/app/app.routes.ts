import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent() {
      return import('./pages/home/home.component').then((x) => x.HomeComponent);
    },
  },
  {
    path: 'admin',
    pathMatch: 'full',
    loadComponent() {
      return import('./pages/admin/admin.component').then(
        (x) => x.AdminComponent
      );
    },
  },
  {
    path: 'cardapio',
    pathMatch: 'full',
    loadComponent() {
      return import('./pages/cardapio/cardapio.component').then(
        (x) => x.CardapioComponent
      );
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
