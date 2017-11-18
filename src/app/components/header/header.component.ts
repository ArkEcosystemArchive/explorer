import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from "../../shared/services/currency.service";
import { ConnectionMessageService } from "../../shared/services/connection-message.service";
import { initCurrency, ticker } from '../../shared/const/currency';

@Component({
  selector: 'ark-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [ExplorerService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _socketValue: any = null;
  public exchangeRate: any = ticker;
  public headerHeight: number = 0;
  public headerSupply: number = 0;
  public headerNethash: string = 'Mainnet';
  public headerBTC: any;
  public headerUSD: any;
  public headerEUR: any;
  public headerCNY: any;
  public headerGBP: any;

  public openMobileMenu: boolean = false;
  public searchQuery: string = '';
  public connection: boolean = true;

  private _timer: any = null;
  private subscription: Subscription;

  @Output() currentCurrency: EventEmitter<string> = new EventEmitter<string>();;

  @Input('socketObject') set socketObject(value: any) {
    if (value && value.status && value.ticker) {
      this._socketValue = value;
      this.headerHeight = value.status.height;
      this.headerSupply = value.status.supply / 100000000;
      this.headerBTC = value.ticker.tickers.ARK.BTC;
      this.headerUSD = value.ticker.tickers.ARK.USD;
      this.headerEUR = value.ticker.tickers.ARK.EUR;
      this.exchangeRate = value.ticker.tickers.ARK;
    } else {
      this._socketValue = null;
      this.exchangeRate = ticker;
    }
  }

  get socketObject(): any {
    return this._socketValue;
  }

  constructor(
    private _explorerService: ExplorerService,
    private router: Router,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService
  ) {
    this.subscription = _connectionService.connectionChange$.subscribe(connection => {
      this.connection = connection;
    });
  }

  ngOnInit() {
    this._currencyService.getCNYprice().subscribe(res => {
      this.headerCNY = res.ticker.price;
    });
    this._currencyService.getGBPprice().subscribe(res => {
      this.headerGBP = res.ticker.price;
    });
    this.getExtraRates();
  }

  showMobileMenu() {
    this.openMobileMenu = !this.openMobileMenu;
  }

  closeMobileMenu(event?) {
    this.openMobileMenu = event ? event: false;
  }

  getExtraRates() {
    this._timer = setInterval(() => {
      this._currencyService.getCNYprice().subscribe(res => {
        this.headerCNY = res.ticker.price;
      });
      this._currencyService.getGBPprice().subscribe(res => {
        this.headerGBP = res.ticker.price;
      });
    }, 5*60000);
  }

  startSearch(event?) {
    if(event && event.keyCode !== 13) {
      return;
    }

    this._explorerService.search(this.searchQuery).subscribe(
      res => {
        if(res.success) {
          this.searchQuery = '';
          this.router.navigate([`/${res.type}`, res.id]);
          this.openMobileMenu = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}
