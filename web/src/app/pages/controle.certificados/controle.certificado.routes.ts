import { Routes } from '@angular/router';
import { ControleCertificadosComponent } from './controle.certificados.component';

export const controleCertificadosRoutes: Routes = [
  {
    path: 'controlecertificados',
    loadComponent: () => ControleCertificadosComponent,
  },
  
];
