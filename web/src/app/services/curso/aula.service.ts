
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { AulaModel,} from '../../models/usuario/controle.usuario.model';
import { PagedResult } from '../base.crud.controller';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class AulaService extends BaseCrudService<AulaModel> {
  constructor() {
    super('aula');
  }

   getAllByCurso(id: number | string): Observable<PagedResult<AulaModel>> {
      return this.httpClient.get<PagedResult<AulaModel>>(this.apiUrl+`/aula/id?id=${id}`);
    }

}
