
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { AulaModel, LiberacaoCursoModel,} from '../../models/usuario/controle.usuario.model';
import { PagedResult } from '../base.crud.controller';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class LiberacaoCursoService extends BaseCrudService<LiberacaoCursoModel> {
  constructor() {
    super('liberacaocurso');
  }

}
