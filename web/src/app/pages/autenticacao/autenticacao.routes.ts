import { Routes } from '@angular/router';

import { LoginComponent } from './login/login-component';

export const autenticacaoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => LoginComponent,
  },
];
