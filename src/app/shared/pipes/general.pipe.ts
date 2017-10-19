import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { initCurrency } from '../const/currency';
import { Subscription } from 'rxjs/Subscription';

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

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
    private subscription: Subscription;
    public currency: string = initCurrency.name;
    public currencyRate: number = initCurrency.value;

    constructor (
        private _currencyService: CurrencyService
    ) {
        this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
          this.currency = currency.name;
          this.currencyRate = currency.value;
        });
    }

    transform(value: number): string {
        var formatted = '';

        if (this.currency === 'ARK' || this.currency === 'BTC') {
            // 8 Decimal Places for Cryptocurrencies. Get rid of trailing 0's
            formatted = value.toFixed(8).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
        } else {
            // 2 Decimal Places for Fiat
            formatted = value.toFixed(2);
        }

        // Add commas
        return formatted.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',');
    }
}