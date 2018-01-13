import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Subscription } from 'rxjs/Subscription';
import { initCurrency } from '../../shared/const/currency';
import { CurrencyService } from '../../shared/services/currency.service';

@Component({
  selector: 'ark-transaction-table',
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnInit, OnDestroy {

  @Input()
  public transactions: Transaction[] = [];

  @Input()
  public showLoader = true;

  public currency: string = initCurrency.name;
  public currencyRate: number = initCurrency.value;

  private currencySubscription: Subscription;

  public constructor(private _currencyService: CurrencyService) {
  }

  public ngOnInit(): void {
    this.currencySubscription = this._currencyService.currencyChosen$.subscribe(currency => {
      this.currency = currency.name;
      this.currencyRate = currency.value;
    });
  }

  public ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
  }

  public getAddressLink(id: string): string[] {
    return ['/address', id];
  }
}
