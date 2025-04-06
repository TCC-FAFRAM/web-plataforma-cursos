import { Routes } from '@angular/router';
import { ControleCursosComponent } from './controle.cursos.component';
import { AulasResolver } from '../../resolvers/aulas.resolver';
import { ControleAulasComponent } from './controle.aulas/controle.aulas.component';




export const controleCursosRoutes: Routes = [
  {
    path: 'controlecursos',
    loadComponent: () => ControleCursosComponent,
  },
  {
  path: 'controlecursos/:idCurso/aula',
  loadComponent: () => ControleAulasComponent,
  providers: [AulasResolver], 
  resolve: {
    aulas: AulasResolver
  }
}

  
];


