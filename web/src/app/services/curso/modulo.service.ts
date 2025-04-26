
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { ModuloModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class ModuloService extends BaseCrudService<ModuloModel> {
  constructor() {
    super('modulo');
  }


}
