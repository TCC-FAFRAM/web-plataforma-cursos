// localizacao.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalizacaoService {
  private api = 'http://localhost:3000/api/localizacao';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/uf`);
  }

  getMunicipiosPorUF(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${uf}/municipios`);
  }

  getDistritosPorMunicipio(idMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${idMunicipio}/distritos`);
  }
}
