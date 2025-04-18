import { Routes } from '@angular/router';
import { authenticateGuard } from './core/http/guard/authenticate.guard';
import { loginGuard } from './core/http/guard/login.guard';
import { LayoutComponent } from './core/ui/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/autenticacao/autenticacao.routes').then(
        m => m.autenticacaoRoutes
      ),
    canActivate: [loginGuard],
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticateGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.routes').then(m => m.homeRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.cursos/controle.cursos.routes').then(m => m.controleCursosRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.fazendas/controle.fazendas.routes').then(m => m.controleFazendasRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.provas/controle.provas.routes').then(m => m.controleProvasRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.usuarios/controle.usuarios.routes').then(m => m.controleUsuariosRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.certificados/controle.certificado.routes').then(m => m.controleCertificadosRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/controle.funcao/controle.funcao.routes').then(m => m.controleFuncaoRoutes),
      }

    ],
  },

  {
    path: '**',
    redirectTo: '/pagina-nao-encontrada',
    pathMatch: 'full',
  },
];
