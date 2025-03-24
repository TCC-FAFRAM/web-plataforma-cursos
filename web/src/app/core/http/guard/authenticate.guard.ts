import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../../../services/autenticacao/token.service';

export const authenticateGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.autenticacaoValida()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
