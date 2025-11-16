import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tableCell'
})
export class TableCellPipe implements PipeTransform {
  transform(value: string): string {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:\d{2}|Z)?$/

    if (value === "undefined") {
      return ""
    }

    if (isoRegex.test(value)) {
      const date = new Date(value)
      return new Intl.DateTimeFormat("ru-RU", {
        dateStyle: "short",
        timeStyle: "medium",
        hour12: false,
      }).format(date)
    }

    return value
  }
}
