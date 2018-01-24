import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ThemeService } from '../../shared/services/theme.service';
import { CONFIG } from '../../app.config';
import { AccountResponse } from '../../models/account.model';
import { Delegate, DelegateResponse } from '../../models/delegate.model';
import { BlockResponse } from '../../models/block.model';
import { TransactionResponse } from '../../models/transaction.model';
import { SearchExecutor } from './search-executor';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
  private activeSearches: SearchExecutor<any>[] = [];

  @Output() currentCurrency: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _explorerService: ExplorerService,
    private router: Router,
    private _currencyService: CurrencyService,
    public themeService: ThemeService,
    private toastr: ToastrService,
    private translate: TranslateService
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

    this.activeSearches.forEach(s => s.unsubscribe());
    this.activeSearches = [];

    this.activeSearches.push(new SearchExecutor<AccountResponse>(
      this._explorerService.searchByAddress(this.searchQuery),
      res => res.success,
      res => [`/address`, res.account.address]));

    this.activeSearches.push(new SearchExecutor<DelegateResponse>(
      this._explorerService.searchByDelegateUserName(this.searchQuery),
      res => res.success,
      res => [`/address`, res.delegate.address]));

    this.activeSearches.push(new SearchExecutor<Delegate>(
      this._explorerService.getDelegateByPublicKey(this.searchQuery),
      res => res && res.address && res.address.length !== 0,
      res => [`/address`, res.address]));

    this.activeSearches.push(new SearchExecutor<BlockResponse>(
      this._explorerService.searchByBlockId(this.searchQuery),
      res => res.success,
      res => [`/block`, res.block.id]));

    this.activeSearches.push(new SearchExecutor<TransactionResponse>(
      this._explorerService.searchByTransactionId(this.searchQuery),
      res => res.success,
      res => [`/tx`, res.transaction.id]));

    let hasResult = false;
    let doneCounter = 0;
    this.activeSearches.forEach(s => {
      s.execute((route) => {
          hasResult = true;
          this.onSearchSuccess(route);
        },
        (error) => console.log(error),
        () => {
          if (++doneCounter === this.activeSearches.length && !hasResult) {
            this.translate.get('HEADER.SEARCH_NO_RESULTS', {'query': this.searchQuery}).subscribe(message => {
              this.toastr.info(message);
            });
          }
        });
    });
  }

  private onSearchSuccess(route: any[]): void {
    this.searchQuery = '';
    this.router.navigate(route);
    this.openMobileMenu = false;
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
    return Object.keys(this.exchangeRate).map((key) => {
      return {
        name: key,
        value: this.exchangeRate[key],
      };
    }).filter((currency) => {
      return currency.name !== 'ARK' && currency.name !== 'DARK';
    });
  }

  private getExchangeRates(): void {
    for (const currency of this._network.CURRENCIES) {
      if (currency === 'USD') {
        this.exchangeRate['BTC'] = null;
      }
      this.exchangeRate[currency] = null;

      this._currencyService.getPriceFor(currency).subscribe(res => {
        if (!res.price_btc) {
          return;
        }

        if (currency === 'USD') {
          this.exchangeRate['BTC'] = res.price_btc;
        }
        this.exchangeRate[currency] = res[`price_${currency.toLowerCase()}`];
      });
    }
  }
}

