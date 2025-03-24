import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumberFormat',
  standalone: true,
})
export class CustomNumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formattedValue = value.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      useGrouping: true,
    });

    return formattedValue;
  }
}
