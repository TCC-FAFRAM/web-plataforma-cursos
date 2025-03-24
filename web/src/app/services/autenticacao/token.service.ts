import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IPayloadDTO } from '../../dtos/payload.dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService extends BaseService {
  readonly #token: string = `${this.app}token`;
  readonly #refreshToken: string = `${this.app}refreshToken`;
  readonly #payload: string = `${this.app}payload`;
  autenticacaoValidaSubject: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);


  setAutenticacaoValida(value: boolean): void {
    this.autenticacaoValidaSubject.next(value);
  }

  getAutenticacaoValida$() {
    return this.autenticacaoValidaSubject.asObservable();
  }

  getPayload() {
    const payload = sessionStorage.getItem(this.#payload);
    if (payload !== null) {
      return JSON.parse(payload);
    }
  }

  salvarToken(token: string) {
    sessionStorage.setItem(this.#token, token);
    const payload = this.decodificarPayload();
    if (payload !== null) {
      sessionStorage.setItem(this.#payload, JSON.stringify(payload));
    }
    return;
  }


  salvarRefreshToken(refreshToken: string) {
    return sessionStorage.setItem(this.#refreshToken, refreshToken);
  }

  retornarToken() {
    return sessionStorage.getItem(this.#token) ?? '';
  }


  retornarRefreshToken() {
    return sessionStorage.getItem(this.#refreshToken) ?? '';
  }

  possuiToken() {
    return !!this.retornarToken();
  }

  possuiRefreshToken() {
    return !!this.retornarRefreshToken();
  }

  public limpar() {
    this.setAutenticacaoValida(false);
    sessionStorage.clear();
  }

  public autenticacaoValida(): boolean {
    if (this.possuiToken()) {
      const payload = this.decodificarPayload();
      if (payload?.isExpired !== null) {
        if (payload!.isExpired === false) {
          this.setAutenticacaoValida(true);
          return true;
        }
        return false;
      }
    }
    return false;
  }

  public decodificarPayload(): IPayloadDTO | null {
    const token = sessionStorage.getItem(this.#token);

    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1])) as IPayloadDTO;

        payload.dateExpired = new Date(payload.exp * 1000);
        payload.isExpired = payload.dateExpired < new Date();

        return payload;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
