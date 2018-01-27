import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CurrencyService } from '../../shared/services/currency.service';
import { initCurrency } from '../../shared/const/currency';
import { Account, AccountsResponse } from '../../models/account.model';
import { CONFIG } from '../../app.config';
import { Delegate } from '../../models/delegate.model';
import { ExplorerService } from '../../shared/services/explorer.service';

export class LoadAccountsResult extends AccountsResponse {
  public success: boolean;
  public isLast: boolean;
  public accounts: Account[];
}

@Component({
  selector: 'ark-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.less']
})
export class AddressTableComponent implements OnInit, OnDestroy {
  @Input()
  public loadAccountsFunc: (pageSize: number, offset: number, loadAll?: boolean) => Observable<LoadAccountsResult>;

  @Input()
  public initialNumberOfAccounts = 50;

  @Input()
  public additionalNumberOfAccounts = 50;

  @Input()
  public supportsLoadAll: boolean;

  @Input()
  public totalSupply: number;

  @Input()
  public supplyLabel: string;

  public accounts: Account[] = [];
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public supply = 0;
  public showLoader = false;
  public areLoadButtonsVisible = true;
  public known = CONFIG.activeNetwork.knownAddresses;
  public delegates: {[publicKey: string]: Delegate} = {};

  private subscription: Subscription;
  private supplySubscription: Subscription;
  private delegateSubscription: Subscription;

  constructor(private router: Router,
              private _currencyService: CurrencyService,
              private _explorerService: ExplorerService) {
  }

  public ngOnInit(): void {
    this.showLoader = true;
    this.loadAccountsFunc(this.initialNumberOfAccounts, 0).subscribe(this.loadAccountsCallback);

    this.subscription = this._currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });

    this.delegateSubscription = this._explorerService.getDelegatesByPublicKey().subscribe(delegates => {
      this.delegates = delegates;
    });

    if (this.totalSupply) {
      this.supply = this.totalSupply;
    } else {
      this.supplySubscription = this._currencyService.supplyChosen$.subscribe(supply => {
        this.supply = supply;
      });
    }
  }

  public loadAccounts(): void {
    this.showLoader = true;
    this.areLoadButtonsVisible = false;
    this.loadAccountsFunc(this.additionalNumberOfAccounts, this.accounts.length).subscribe(this.loadAccountsCallback);
  }

  public loadAllAccounts(): void {
    this.showLoader = true;
    this.areLoadButtonsVisible = false;
    this.loadAccountsFunc(0, 0, true).subscribe(this.loadAccountsCallback);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.delegateSubscription.unsubscribe();
    if (this.supplySubscription) {
      this.supplySubscription.unsubscribe();
    }
  }

  public isKnown(account: Account): boolean {
    return this.known.hasOwnProperty(account.address);
  }

  public isDelegate(account: Account): boolean {
    return this.delegates && this.delegates.hasOwnProperty(account.publicKey);
  }

  private loadAccountsCallback = (res: LoadAccountsResult): void => {
    this.accounts = this.accounts.concat(res.accounts || []);
    this.showLoader = !res.success;
    this.areLoadButtonsVisible = !res.isLast;
  };
}
