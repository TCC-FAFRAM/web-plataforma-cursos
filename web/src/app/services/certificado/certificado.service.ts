
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { CertificadoModel, UsuarioModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class CertificadoService extends BaseCrudService<CertificadoModel> {
  constructor() {
    super('certificado'); 
  }


}
