import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPayloadDTO } from '../../dtos/payload.dto';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioAuthService extends BaseService {
  getUsuarioLogado() {
    throw new Error('Method not implemented.');
  }
  private readonly payload: string = `${this.app}payload`;

  public showProfile(): Observable<UsuarioModel> {
    return this.httpClient.get<UsuarioModel>(this.apiUrl);
  }

  public showName(): string {
    const payload = sessionStorage.getItem(this.payload);

    if (payload !== null) {
      const payloadDTO = JSON.parse(payload) as IPayloadDTO;

      return payloadDTO.nome;
    }

    return '';
  }

  public getCodigo(): string {
    const payload = sessionStorage.getItem(this.payload);

    if (payload !== null) {
      const payloadDTO = JSON.parse(payload) as IPayloadDTO;
      return payloadDTO.email;
    }

    return '';
  }
}
