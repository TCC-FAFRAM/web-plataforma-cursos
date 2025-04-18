import { Routes } from '@angular/router';
import { ControleFuncaoComponent } from './controle.funcao.component';


export const controleFuncaoRoutes: Routes = [
  {
    path: 'controlefunções',
    loadComponent: () => ControleFuncaoComponent,
  },
 

  
];


