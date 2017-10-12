import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from "../../shared/services/connection-message.service";
import { initCurrency } from '../../shared/const/currency';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less'],
  providers: [ ExplorerService ]
})
export class TransactionComponent implements OnInit,OnDestroy {
  public transaction: any;
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _explorerService: ExplorerService,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService
  ) {
    this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params: Params) => {
      this._explorerService.getTransaction(params["id"]).subscribe(
        res => {
          this.transaction = res.transaction;
          this._connectionService.changeConnection(res.success);
        }
      );
    });
  }

  goToAddress(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/address', id]);
  }

  goToBlock(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/block', id]);
  }

  goToTransaction(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/tx', id]);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
