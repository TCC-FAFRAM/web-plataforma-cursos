
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { CertificadoModel, CursoModel, ProvaModel, QuestaoModel, RespostaQuestaoModel, UsuarioModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class RespostaQuestaoService  extends BaseCrudService<RespostaQuestaoModel> {
  constructor() {
    super('/respostaQuestao'); 
  }


}
