import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { ticker } from '../../shared/const/currency';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'ark-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [ExplorerService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public exchangeRate: any = {
    'ARK': 1,
    'BTC': 1,
    'USD': 1,
    'EUR': 1,
    'GBP': 1,
    'CNY': 1,
    'KRW': 1,
  };
  public headerHeight = 0;
  public headerSupply = 0;
  public headerNethash = 'Mainnet';
  public headerBTC: any;
  public headerUSD: any;
  public headerEUR: any;
  public headerGBP: any;
  public headerCNY: any;
  public headerKRW: any;

  public openMobileMenu = false;
  public searchQuery = '';
  public connection = true;

  private _timer: any = null;
  private subscription: Subscription;

  @Output() currentCurrency: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _explorerService: ExplorerService,
    private router: Router,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getHeight();
    this.getExchangeRates();

    this._timer = setInterval(() => {
      this.getHeight();
      this.getExchangeRates();
    }, 60000);
  }

  showMobileMenu() {
    this.openMobileMenu = !this.openMobileMenu;
  }

  closeMobileMenu(event?) {
    this.openMobileMenu = event ? event : false;
  }

  startSearch(event?) {
    if (event && event.keyCode !== 13) {
      return;
    }

    this._explorerService.searchByAddress(this.searchQuery).subscribe(res => {
      if (res.success) {
        this.searchQuery = '';
        this.router.navigate([`/address`, res.account.address]);
        this.openMobileMenu = false;
      }
    });

    this._explorerService.searchByUsername(this.searchQuery).subscribe(res => {
      if (res.success) {
        this.searchQuery = '';
        this.router.navigate([`/address`, res.delegate.address]);
        this.openMobileMenu = false;
      }
    });

    this._explorerService.getDelegate(this.searchQuery).subscribe(res => {
      this.searchQuery = '';
      this.router.navigate([`/address`, res.address]);
      this.openMobileMenu = false;
    });

    this._explorerService.searchByBlockId(this.searchQuery).subscribe(res => {
      if (res.success) {
        this.searchQuery = '';
        this.router.navigate([`/block`, res.block.id]);
        this.openMobileMenu = false;
      }
    });

    this._explorerService.searchByTransactionId(this.searchQuery).subscribe(res => {
      if (res.success) {
        this.searchQuery = '';
        this.router.navigate([`/tx`, res.transaction.id]);
        this.openMobileMenu = false;
      }
    });
  }

  ngOnDestroy() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  private getHeight() {
    this._currencyService.getHeight().subscribe(res => {
      if (res.success) {
        this.headerHeight = res.height;

        this.getSupply();
      }
    });
  }

  private getSupply() {
    this._currencyService.getSupply().subscribe(res => {
      if (res.success) {
        this.headerSupply = 125000000 + (this.headerHeight - 75600) * 2;
      }
  });
  }

  private getExchangeRates(): void {
    this._currencyService.getPriceFor('USD').subscribe(res => {
      this.headerBTC = res.price_btc;
      this.exchangeRate.BTC = res.price_btc;

      this.headerUSD = res.price_usd;
      this.exchangeRate.USD = res.price_usd;
    });

    this._currencyService.getPriceFor('EUR').subscribe(res => {
      this.headerEUR = res.price_eur;
      this.exchangeRate.EUR = res.price_eur;
    });

    this._currencyService.getPriceFor('GBP').subscribe(res => {
      this.headerGBP = res.price_gbp;
      this.exchangeRate.GBP = res.price_gbp;
    });

    this._currencyService.getPriceFor('CNY').subscribe(res => {
      this.headerCNY = res.price_cny;
      this.exchangeRate.CNY = res.price_cny;
    });

    this._currencyService.getPriceFor('KRW').subscribe(res => {
      this.headerKRW = res.price_krw;
      this.exchangeRate.KRW = res.price_krw;
    });
  }
}
