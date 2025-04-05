import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { DropdownDTO } from '../../dtos/dropdown/dropdown.dto';



@Injectable({
  providedIn: 'root',
})
export class DistritoService extends BaseService {
  private readonly api = `${this.apiUrl}/localizacao`; 

  getUFs(): Observable<DropdownDTO[]> {
    return this.httpClient.get<DropdownDTO[]>(`${this.api}/uf`);
  }

  getMunicipios(uf: string): Observable<DropdownDTO[]> {
    return this.httpClient.get<DropdownDTO[]>(`${this.api}/${uf}/municipios`);
  }

  getDistritos(idMunicipio: number): Observable<DropdownDTO[]> {
    return this.httpClient.get<DropdownDTO[]>(`${this.api}/${idMunicipio}/distritos`);
  }
}
