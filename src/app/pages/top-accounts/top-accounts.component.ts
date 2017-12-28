import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import {Account} from '../../models/account.model';

@Component({
  selector: 'ark-top-accounts',
  templateUrl: './top-accounts.component.html',
  styleUrls: ['./top-accounts.component.less'],
  providers: [ExplorerService]
})
export class TopAccountsComponent implements OnInit, OnDestroy {
  public accounts: Account[] = [];
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public supply = 0;
  public showLoader = false;

  private subscription: Subscription;
  private supplySubscription: Subscription;

  constructor(
    private router: Router,
    private _explorerService: ExplorerService,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService
  ) {
    this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });
    this.supplySubscription = _currencyService.supplyChosen$.subscribe(supply => {
      this.supply = supply;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showLoader = true;
    this._explorerService.getTopAccounts(50, 0).subscribe(
      res => {
        this.accounts = res.accounts;
        this._connectionService.changeConnection(res.success);
        this.showLoader = !res.success;
      }
    );
  }

  loadAccounts() {
    this.showLoader = true;
    this._explorerService.getTopAccounts(50, this.accounts.length - 1).subscribe(
      res => {
        this.accounts = this.accounts.concat(res.accounts);
        this._connectionService.changeConnection(res.success);
        this.showLoader = !res.success;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.supplySubscription.unsubscribe();
  }

}
