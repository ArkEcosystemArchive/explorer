import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import {Block} from '../../models/block.model';
import {Pagination} from '../../models/pagination.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ark-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.less'],
  providers: [ExplorerService]
})
export class BlockListComponent implements OnInit, OnDestroy {
  public blocks: Block[] = [];
  public pagination: Pagination;
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public showLoader = false;

  private subscription: Subscription;
  private _currentPage = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.showLoader = true;
    this.route.params.subscribe((params: Params) => {
      this._currentPage = +params['page'];

      const queryParams = this._currentPage * 20 - 20;

      this._explorerService.getLastBlocks(queryParams).subscribe(
        res => {
          this.blocks = res.blocks;
          this.pagination = res.pagination;
          // this._connectionService.changeConnection(res.success);
          this.showLoader = false;
          // this.showLoader = !res.success;
        }
      );
    });
  }

  changePage() {
    this.blocks = [];
    this.showLoader = true;
  }

  getPageLink(page: number) {
    return ['/blocks', page];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
