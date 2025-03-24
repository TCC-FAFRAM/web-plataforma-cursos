import { Routes } from '@angular/router';
import { ControleFazendasComponent } from './controle.fazendas.component';




export const controleFazendasRoutes: Routes = [
  {
    path: 'controlefazendas',
    loadComponent: () => ControleFazendasComponent,
  },
  
];
