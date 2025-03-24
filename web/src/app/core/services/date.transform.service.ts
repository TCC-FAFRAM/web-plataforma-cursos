import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTransformService {
  #datePipe = new DatePipe('pt-BR');

  public getDateString(date: Date): string {
    return this.#datePipe.transform(date, 'dd/MM/YYYY')!;
  }

  public getDateParamsString(date: Date): string {
    return this.#datePipe.transform(date, 'YYYY/MM/dd')!;
  }
}
