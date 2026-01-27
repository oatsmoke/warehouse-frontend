import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tableCell'
})
export class TableCellPipe implements PipeTransform {
  transform(value: string): string {
    if (value === "undefined") {
      return ""
    }

    return value
  }
}
