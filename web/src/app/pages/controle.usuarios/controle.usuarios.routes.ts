import { Routes } from '@angular/router';
import { ControleUsuariosComponent } from './controle.usuarios.component';
import { ControleLiberacaoCursoComponent } from './controle.liberacao.curso/controle.liberacao.curso.component';




export const controleUsuariosRoutes: Routes = [
  {
    path: 'controleusuarios',
    loadComponent: () => ControleUsuariosComponent,
  },
  {
    path: 'controleliberacaocurso',
    loadComponent: () => ControleLiberacaoCursoComponent,
  },
  
];
