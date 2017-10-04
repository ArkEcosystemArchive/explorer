import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localDate' })
export class DatePipe implements PipeTransform {
    transform(value: number): number {
        let staticDate = new Date(Date.UTC(2017, 2, 21, 13)).getTime();
        let actualTime: any = +staticDate + value*1000;
        
        return actualTime;
    }
}

@Pipe({ name: 'overflowText' })
export class OverflowTextPipe implements PipeTransform {
    transform(value: any): string {
        if (!value) {
            return '';
        }

        let first = value.substring(0, 5);
        let last = value.substring(value.length - 5);
        
        return first + '...' + last;
    }
}