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
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
