
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { CertificadoModel, CursoModel, ProvaModel, UsuarioModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class ProvaService extends BaseCrudService<ProvaModel> {
  constructor() {
    super('prova'); 
  }


}
