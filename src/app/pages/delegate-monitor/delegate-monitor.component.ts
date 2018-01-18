import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../../shared/services/currency.service';
import { DelegateMonitorService } from './delegate-monitor.service';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CoinmarketService } from '../../shared/services/coinmarket.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ark-delegate-monitor',
  templateUrl: './delegate-monitor.component.html',
  styleUrls: ['./delegate-monitor.component.less'],
  providers: [DelegateMonitorService, ExplorerService, CoinmarketService]
})
export class DelegateMonitorComponent implements OnInit, OnDestroy {
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public monitorData: any;
  public totalForged = 0;
  public bestForger: any;
  public productivity: any;
  public delegatesList: any = [];
  public activeDelegate = true;
  public chart: any;
  public activeChartTab = 'day';
  public supply: number;
  public height: number;
  public totals: any;

  private _timer = null;
  private subscription: Subscription;
  private chartSubscription: Subscription;

  constructor(
    private router: Router,
    private _currencyService: CurrencyService,
    private _monitorService: DelegateMonitorService,
    private _explorerService: ExplorerService,
    private _marketService: CoinmarketService,
    private _connectionService: ConnectionMessageService
  ) {
    this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });

    this.chartSubscription = _marketService.chartBuilt$.subscribe(chart => {
      this.chart = chart;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._connectionService.changeConnection(false);

    this.monitorData = {
      active: null,
      lastBlock: null,
      nextForgers: null,
      registrations: null,
      votes: null,
    };

    this._loadBlockData();

    this._loadDelegateData();

    this._timer = setInterval(() => {
      this._loadBlockData();
      this._loadDelegateData();
    }, 8000);

    this._marketService.build(this.activeChartTab);
  }

  private _loadBlockData() {
      this._currencyService.getSupply().subscribe(res => { this.supply = res.supply; });
      this._currencyService.getHeight().subscribe(res => { this.height = res.height; });
  }

  private _loadDelegateData() {
    this._getNextForgers();
    this._getLastBlock();
    this._getLatestRegistrations();
    this._getLatestVotes();
  }

  private _getTop51Delegates(forgers, blocks) {
    this._explorerService.getActiveDelegates(forgers, blocks).subscribe(res => {
      this.monitorData.active = res;
      this._setDelegatesList(this.monitorData);

      this.bestForger = this._monitorService.getBestForger(this.monitorData);
      this.totalForged = this._monitorService.getTotalForged(this.monitorData);
      this.totals = this._monitorService.getTotals(this.monitorData, this.height);
      this.productivity = this._monitorService.getProductivity(this.monitorData);
    });
  }

  private _getNextForgers() {
    this._explorerService.getNextForgers().subscribe(resForgers => {
      this.monitorData.nextForgers = resForgers.slice(0, 9);

      this._explorerService.getLatestBlocks().subscribe(resBlocks => {
        this._getTop51Delegates(resForgers, resBlocks);
      });
    });
  }

  private _getLastBlock() {
    this._explorerService.getLastBlock().subscribe(res => {
      this.monitorData.lastBlock = res;
    });
  }

  private _getLatestRegistrations() {
    this._explorerService.getLatestRegistrations().subscribe(res => {
      this.monitorData.registrations = res.transactions;
    });
  }

  private _getLatestVotes() {
    this._explorerService.getLatestVotes().subscribe(res => {
      this.monitorData.votes = res.transactions;
    });
  }

  private _setDelegatesList(data: any) {
    if (!this.activeDelegate) {
      return;
    }

    this.delegatesList = data.hasOwnProperty('active') ? data.active.delegates : null;
  }

  getActiveDelegates() {
    this.activeDelegate = true;
    this.delegatesList = this.monitorData ? this.monitorData.active.delegates : null;
  }

  getStandbyDelegates() {
    this.activeDelegate = false;
    this._explorerService.getStandby().subscribe(
      res => {
        this.delegatesList = res.delegates;
      }
    );
  }

  getAddressLink(id: string) {
    return ['/address', id];
  }

  getTransactionLink(id: string) {
    return ['/tx', id];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.chartSubscription.unsubscribe();
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}
