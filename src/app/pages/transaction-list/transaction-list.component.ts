import { Component, OnInit} from '@angular/core';
import { ExplorerService } from '../../shared/services/explorer.service';
import { Pagination } from '../../models/pagination.model';
import { PaginatedTransactions, Transaction } from '../../models/transaction.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ark-block-list',
  templateUrl: './transaction-list.component.html',
  providers: [ExplorerService]
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  public pagination: Pagination;
  public showLoader = false;

  public constructor(private _explorerService: ExplorerService) {
  }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showLoader = true;
  }

  public getLastTransactions = (offset?: number): Observable<PaginatedTransactions> => {
    return this._explorerService.getLastTransactions({offset: offset});
  };

  public onChangePage = (): void => {
    this.transactions = [];
    this.showLoader = true;
  };

  public onPageResult = (pageResult: PaginatedTransactions): void => {
    this.transactions = pageResult.transactions;
    this.showLoader = false;
  };

  public getPageLink(page: number): any[] {
    return ['/transactions', page];
  }
}
