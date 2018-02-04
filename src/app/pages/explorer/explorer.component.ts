import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { CoinmarketService } from '../../shared/services/coinmarket.service';
import { initCurrency } from '../../shared/const/currency';
import { ThemeService } from '../../shared/services/theme.service';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'ark-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.less'],
  providers: [CoinmarketService]
})
export class ExplorerComponent implements OnInit, OnDestroy {
  private readonly chartStorageKey = 'chartPeriod';

  public transactions: any[];
  public blocks: any[];
  public chart: any;
  public isChartVisible: boolean;
  public currency: string = initCurrency.name;
  public currencyRate: number = initCurrency.value;
  public activeChartTab;
  public showTransactionLoader = false;
  public showBlockLoader = false;

  private _timer = null;
  private subscription: Subscription;
  private chartSubscription: Subscription;

  constructor(private _explorerService: ExplorerService,
              private _currencyService: CurrencyService,
              private _marketService: CoinmarketService,
              private _themeService: ThemeService,
              private _localStorageService: LocalStorageService) {
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

    this.getLastTransactions();
    this.getLastBlocks();

    this._timer = setInterval(() => {
      this.getLastTransactions();
      this.getLastBlocks();
    }, 60000);

    this.activeChartTab = this._localStorageService.getValue(this.chartStorageKey) || 'day';
    this._marketService.build(this.activeChartTab);
  }

  updateChart(event) {
    this.activeChartTab = event.target.id;
    this._localStorageService.setValue(this.chartStorageKey, this.activeChartTab);
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

  private getLastTransactions() {
    this._explorerService.getLastTransactions().subscribe(
      res => {
        this.transactions = res.transactions;
        this.showTransactionLoader = false;
      }
    );
  }

  private getLastBlocks() {
    this._explorerService.getLastBlocks(0).subscribe(
      res => {
        this.blocks = res.blocks;
        this.showBlockLoader = false;
      }
    );
  }
}
