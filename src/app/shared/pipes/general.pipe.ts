import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localDate' })
export class DatePipe implements PipeTransform {
    transform(value: number): number {
        const staticDate = new Date(Date.UTC(2017, 2, 21, 13)).getTime();
      return +staticDate + value * 1000;
    }
}

@Pipe({ name: 'overflowText' })
export class OverflowTextPipe implements PipeTransform {
    transform(value: any): string {
        if (!value) {
            return '';
        }

        const first = value.substring(0, 5);
        const last = value.substring(value.length - 5);

        return first + '...' + last;
    }
}
