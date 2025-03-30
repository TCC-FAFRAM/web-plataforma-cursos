
import { Injectable } from '@angular/core';
import { BaseCrudService} from '../base.crud.service';
import { UsuarioModel } from '../../models/usuario/controle.usuario.model';



@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends BaseCrudService<UsuarioModel> {
  constructor() {
    super('usuario'); 
  }


}
