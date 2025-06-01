import { Routes } from '@angular/router';

import { LoginComponent } from './login/login-component';
import { CadastroUsuarioComponent } from './cadastro.usuario/cadastro.usuario.component';

export const autenticacaoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => LoginComponent,
  },
   
];
