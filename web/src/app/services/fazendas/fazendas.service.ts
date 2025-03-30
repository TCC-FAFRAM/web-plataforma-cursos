
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { CertificadoModel, CursoModel, FazendaModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class FazendaService extends BaseCrudService<FazendaModel> {
  constructor() {
    super('fazenda'); 
  }


}
