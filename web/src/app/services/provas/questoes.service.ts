
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { CertificadoModel, CursoModel, ProvaModel, QuestaoModel, UsuarioModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class QuestaoService extends BaseCrudService<QuestaoModel> {
  constructor() {
    super('/questao'); 
  }


}
