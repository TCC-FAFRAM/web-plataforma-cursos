import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';

import { CreateUsuarioModel, LoginUsuarioModel } from '../../models/autenticacao/login-usuario.model';
import { LoginModel } from '../../models/autenticacao/login.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService extends BaseService {
  readonly #apiUrl = `${this.apiUrl}/auth`;

  autenticacao({
    email,
    senha,
  }: LoginUsuarioModel): Observable<LoginModel> {

    return this.httpClient
      .post<LoginModel>(this.#apiUrl+'/login', {
        email,
        senha,
      })
      .pipe(first());
  }


  
  create ({
nome,
sobre_nome,
email,
senha,
cpf,
fk_id_fazenda,
municipio_id,
distrito_id,
complemento,
  }: CreateUsuarioModel): Observable<CreateUsuarioModel> {

    return this.httpClient
      .post<CreateUsuarioModel>(this.#apiUrl+'/register', {
        nome,
sobre_nome,
email,
senha,
cpf,
fk_id_fazenda,
municipio_id,
distrito_id,
complemento,
      })
      .pipe(first());
  }

}
