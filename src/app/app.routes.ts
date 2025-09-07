import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hero',
  },
  {
    path: 'hero',
    loadChildren: () => import('./components/hero/hero.routes'),
  },
];
