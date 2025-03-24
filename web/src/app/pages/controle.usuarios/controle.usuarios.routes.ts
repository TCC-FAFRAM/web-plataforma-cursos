import { Routes } from '@angular/router';
import { ControleUsuariosComponent } from './controle.usuarios.component';




export const controleUsuariosRoutes: Routes = [
  {
    path: 'controleusuarios',
    loadComponent: () => ControleUsuariosComponent,
  },
  
];
