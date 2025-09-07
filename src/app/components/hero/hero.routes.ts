import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginated',
    pathMatch: 'prefix',
  },

  {
    path: 'paginated',
    loadComponent: () => import('./paginated/paginated').then((c) => c.Paginated),
  },

  {
    path: 'detail/:heroId',
    loadComponent: () => import('./detail/detail').then((c) => c.Detail),
  },

  {
    path: 'create',
    loadComponent: () => import('./create/create').then((c) => c.Create),
  },

  {
    path: 'update/:heroId',
    loadComponent: () => import('./update/update').then((c) => c.Update),
  },

  {
    path: '**',
    redirectTo: 'paginated',
  },
];

export default routes;
