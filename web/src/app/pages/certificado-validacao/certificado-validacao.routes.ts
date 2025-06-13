import { Routes } from '@angular/router';
import { CertificadoValidacaoComponent } from './certificado-validacao.component';
import { CerticadoNaoEncontradoComponent } from './certicado-nao-encontrado/certicado-nao-encontrado.component';

export const certificadoRouter: Routes = [
  {
    path: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855v',
    loadComponent: () => CertificadoValidacaoComponent,
  },
   {
    path: '',
    loadComponent: () => CerticadoNaoEncontradoComponent,
  },
];
