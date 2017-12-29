import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import {Account} from '../../models/account.model';

@Component({
  selector: 'ark-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.less']
})
export class AddressTableComponent implements OnInit, OnDestroy {
  public accounts: Account[] = [];
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public supply = 0;
  public showLoader = false;
  public isLoadButtonVisible = true;

  @Input()
  public loadAccountsFunc: (pageSize: number, offSet: number) => Observable<{success: boolean, isLast: boolean, accounts: Account[]}>;

  @Input()
  public initialNumberOfAccounts = 50;

  @Input()
  public additionalNumberOfAccounts = 50;

  @Input()
  public totalSupply: number;

  @Input()
  public supplyLabel: string;

  private subscription: Subscription;
  private supplySubscription: Subscription;

  constructor(private router: Router,
              private _currencyService: CurrencyService,
              private _connectionService: ConnectionMessageService) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.loadAccountsFunc(this.initialNumberOfAccounts, 0).subscribe(this.loadAccountsCallback);
    this.subscription = this._currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });
    if (this.totalSupply) {
      this.supply = this.totalSupply;
    } else {
      this.supplySubscription = this._currencyService.supplyChosen$.subscribe(supply => {
        this.supply = supply;
      });
    }
  }

  loadAccounts() {
    this.showLoader = true;
    this.loadAccountsFunc(this.additionalNumberOfAccounts, this.accounts.length).subscribe(this.loadAccountsCallback);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.supplySubscription) {
      this.supplySubscription.unsubscribe();
    }
  }

  private loadAccountsCallback= (res: {success: boolean, isLast: boolean, accounts: Account[]}): void => {
    this.accounts = this.accounts.concat(res.accounts || []);
    this._connectionService.changeConnection(res.success);
    this.showLoader = !res.success;
    this.isLoadButtonVisible = !res.isLast;
  }
}
