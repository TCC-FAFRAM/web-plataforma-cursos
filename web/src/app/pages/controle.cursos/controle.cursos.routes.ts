import { Routes } from '@angular/router';
import { ControleCursosComponent } from './controle.cursos.component';
import { AulasResolver } from '../../resolvers/aulas.resolver';
import { ControleAulasComponent } from './controle.aulas/controle.aulas.component';
import { ControleModulosComponent } from './controle.modulos/controle.modulos.component';




export const controleCursosRoutes: Routes = [
  {
    path: 'controlecursos',
    loadComponent: () => ControleCursosComponent,
  },
  {
  path: 'controleaula/:idCurso/aula',
  loadComponent: () => ControleAulasComponent,
  providers: [AulasResolver],
  resolve: {
    aulas: AulasResolver
  }
},
{
  path: 'controlemodulos',
  loadComponent: () => ControleModulosComponent,
  providers: [],
},
{
  path: 'controleaula',
  loadComponent: () => ControleAulasComponent,
}


];


