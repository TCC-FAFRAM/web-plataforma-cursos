import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';

import { LoginUsuarioModel } from '../../models/autenticacao/login-usuario.model';
import { LoginModel } from '../../models/autenticacao/login.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService extends BaseService {
  readonly #apiUrl = `${this.apiUrl}/auth/login`;

  autenticacao({
    email,
    senha,
  }: LoginUsuarioModel): Observable<LoginModel> {

    return this.httpClient
      .post<LoginModel>(this.#apiUrl, {
        email,
        senha,
      })
      .pipe(first());
  }

}
