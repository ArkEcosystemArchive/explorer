import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import { Transaction } from '../../models/transaction.model';
import {Block} from '../../models/block.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ark-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.less'],
  providers: [ExplorerService]
})
export class BlockComponent implements OnInit, OnDestroy {
  public block: Block;
  public transactions: Transaction[] = [];
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;

  public erroneousBlockId: string;
  public error: Error;

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
      this.setErrorInfo();
      this._explorerService.getBlock(params['id']).subscribe(block => {
          this.block = block;
          this._connectionService.changeConnection(true);
        },
        (error) => {
          this._connectionService.changeConnection(false);
          this.setErrorInfo(params['id'], error);
        });

      this._explorerService.getTransactionsByBlock(params['id']).subscribe(
        res => {
          this.transactions = res.transactions;
          // this._connectionService.changeConnection(res.success);
        }
      );
    });
  }

  getAddressLink(id: string) {
    return ['/address', id];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setErrorInfo(id?: string, error?: Error): void {
    this.erroneousBlockId = id;
    this.error = error;
  }
}
