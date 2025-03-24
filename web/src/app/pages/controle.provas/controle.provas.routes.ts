import { Routes } from '@angular/router';
import { ControleProvasComponent } from './controle.provas.component';




export const controleProvasRoutes: Routes = [
  {
    path: 'controleprovas',
    loadComponent: () => ControleProvasComponent,
  },
  
];
