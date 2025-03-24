import { Routes } from '@angular/router';
import { ControleCursosComponent } from './controle.cursos.component';




export const controleCursosRoutes: Routes = [
  {
    path: 'controlecursos',
    loadComponent: () => ControleCursosComponent,
  },
  
];
