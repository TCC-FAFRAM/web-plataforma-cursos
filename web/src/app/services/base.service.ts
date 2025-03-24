/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected httpClient = inject(HttpClient);
  protected readonly app: string = environment.appKey;
  protected readonly apiUrl: string = environment.apiUrl;
  protected setErrorResponse = signal<HttpErrorResponse | null>(null);

  constructor() {
  
  }

  protected throwErrorResponse(error: HttpErrorResponse) {
    this.setErrorResponse.set(error);
    return throwError(() => error);
  }

}
