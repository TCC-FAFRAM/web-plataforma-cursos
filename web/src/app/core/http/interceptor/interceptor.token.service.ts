import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { shareReplay } from 'rxjs';
import { TokenService } from './../../../services/autenticacao/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.retornarToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    shareReplay()
  );
};
