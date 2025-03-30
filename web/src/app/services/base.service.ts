/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../environments/environment';
import { IQueryBuilder } from '../core/http/pagination/iquery_builder';



@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected httpClient = inject(HttpClient);
  protected readonly app: string = environment.appKey;
  protected readonly apiUrl: string = environment.apiUrl;

  constructor() {}


}
