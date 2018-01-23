import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination, PaginationResult } from '../../models/pagination.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ark-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Input()
  public getPageLinkFunc: (pageNumber: number) => any[];

  @Input()
  public getItemsFunc: (offset: number) => Observable<PaginationResult>;

  @Input()
  public pageSize = 20;

  @Output()
  public pageResult: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public changePage: EventEmitter<number> = new EventEmitter<number>();

  public pagination: Pagination;

  private _currentPage: number;
  private itemSubscription: Subscription;
  private routeSubscription: Subscription;

  public constructor(private router: Router,
                     private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.loadItems(+params['page'] || 1);
    });
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.itemSubscription ) {
      this.itemSubscription.unsubscribe();
    }
  }

  public changePageClick(newPage: number): void {
      this.changePage.emit(newPage);
  }

  private loadItems(newPage: number): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }

    this._currentPage = newPage;

    const offset = this._currentPage * this.pageSize - this.pageSize;

    this.itemSubscription = this.getItemsFunc(offset).subscribe((res: PaginationResult) => {
        this.pagination = res.pagination;
        this.pageResult.emit(res);
      }
    );
  }
}
