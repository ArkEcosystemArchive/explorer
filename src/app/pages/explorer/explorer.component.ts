import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { CoinmarketService } from "../../shared/services/coinmarket.service";
import { ConnectionMessageService } from "../../shared/services/connection-message.service";
import { initCurrency } from '../../shared/const/currency';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'ark-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less'],
  providers: [ExplorerService, CoinmarketService]
})
export class ExplorerComponent implements OnInit, OnDestroy {
  public transactions: any;
  public blocks: any;
  public chart: any;
  public isChartVisible: boolean;
  public currency: string = initCurrency.name;
  public currencyRate: number = initCurrency.value;
  public activeChartTab: string = 'day';
  public showTransactionLoader: boolean = false;
  public showBlockLoader: boolean = false;
  
  private _timer = null;
  private subscription: Subscription;
  private chartSubscription: Subscription;

  constructor(
    private _explorerService: ExplorerService,
    private _currencyService: CurrencyService,
    private _marketService: CoinmarketService,
    private _connectionService: ConnectionMessageService,
    private _themeService: ThemeService,
    private router: Router
  ) {
    this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currency = currency.name;
      this.currencyRate = currency.value;
    });

    this._themeService.displayTogglePriceChartSwitch = true;
    this._themeService.isPriceChartChange$.subscribe(isVisible => this.isChartVisible = isVisible);

    this.chartSubscription = this._marketService.chartBuilt$.subscribe(chart => this.chart = chart);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showTransactionLoader = true;
    this.showBlockLoader = true;
    this._explorerService.getLastTransactions().subscribe(
      res => {
        this.transactions = res.transactions;
        this._connectionService.changeConnection(res.success);
        this.showTransactionLoader = !res.success;        
      }
    );

    this._explorerService.getLastBlocks().subscribe(
      res => {
        this.blocks = res.blocks;
        this._connectionService.changeConnection(res.success);
        this.showBlockLoader = !res.success;
      }
    );
    this._marketService.build(this.activeChartTab);
    this.getNewData();
  }

  getNewData() {
    this._timer = setInterval(() => {
      this._explorerService.getLastTransactions().subscribe(
        res => {
          this.transactions = res.transactions;
          this._connectionService.changeConnection(res.success);
        }
      );

      this._explorerService.getLastBlocks().subscribe(
        res => {
          this.blocks = res.blocks;
          this._connectionService.changeConnection(res.success);
        }
      );
    }, 10000);
  }

  updateChart(event) {
    this.activeChartTab = event.target.id;
    this._marketService.build(this.activeChartTab);
  }

  getAddressLink(id: string) {
    return ['/address', id];
  }

  ngOnDestroy() {
    this._themeService.displayTogglePriceChartSwitch = false;
    this.subscription.unsubscribe();
    this.chartSubscription.unsubscribe();
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

}
