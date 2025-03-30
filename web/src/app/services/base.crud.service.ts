import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { BaseService } from './base.service';
import { PagedResult } from './base.crud.controller'; // Certifique-se que o path está correto
import { Observable } from 'rxjs';

export class BaseCrudService<T> extends BaseService {
  private readonly endpoint: string;

  constructor(resource: string) {
    super(); // BaseService tem construtor vazio
    this.endpoint = `${this.apiUrl}/${resource}`;
  }

  getAll(query: HttpParamsOptions): Observable<PagedResult<T>> {
    const params = new HttpParams(query);
    return this.httpClient.get<PagedResult<T>>(this.endpoint, { params });
  }

  create(data: T) {
    return this.httpClient.post<T>(this.endpoint, data);
  }

  update(data: T) {
    return this.httpClient.put<T>(this.endpoint, data);
  }

  delete(id: number) {
    return this.httpClient.request<T>('delete', this.endpoint, {
      body: { id },
    });
  }
}
