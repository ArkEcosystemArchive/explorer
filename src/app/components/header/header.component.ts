import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { ticker } from '../../shared/const/currency';
import { ThemeService } from '../../shared/services/theme.service';
import { CONFIG } from '../../app.config';

@Component({
  selector: 'ark-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [ExplorerService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public headerHeight = 0;
  public headerSupply = 0;
  public headerNethash = CONFIG.NETWORK.toLowerCase();
  public exchangeRate = {};

  public openMobileMenu = false;
  public searchQuery = '';
  public connection = true;

  private _timer: any = null;
  private _network: any = CONFIG.NETWORKS[CONFIG.NETWORK];
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

  public get currencies() {
    return Object.keys(this.exchangeRate).map((key, index) => {
      return {
        name: key,
        value: this.exchangeRate[key],
      };
    }).filter((currency) => {
      return currency.name !== 'ARK' && currency.name !== 'DARK';
    });
  }

  private getExchangeRates(): void {
    let exchangeRate = {};
    for (let currency of this._network.CURRENCIES) {
      if (currency === 'USD') {
        this.exchangeRate['BTC'] = null;
      }
      this.exchangeRate[currency] = null;

      this._currencyService.getPriceFor(currency).subscribe(res => {
        if (currency === 'USD') {
          this.exchangeRate['BTC'] = res.price_btc;
        }

        this.exchangeRate[currency] = res[`price_${currency.toLowerCase()}`];
      });
    }
  }
}
