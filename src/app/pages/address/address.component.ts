import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExplorerService } from '../../shared/services/explorer.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { initCurrency } from '../../shared/const/currency';
import {Transaction} from '../../models/transaction.model';
import {Account} from '../../models/account.model';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ark-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less'],
  providers: [ExplorerService]
})
export class AddressComponent implements OnInit, OnDestroy {
  @ViewChild('voters') votersBlock: ElementRef;
  @ViewChild('balance') balanceContainer: ElementRef;

  public addressItem: Account;
  public currentTransactions: Transaction[];
  public activeTab = 'all-tr';
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public showLoader = false;
  public showBalanceFooter = false;
  public supply = 0;
  public voters: Account[];
  public areVotersExpanded = false;

  private _currentAddress = '';
  private subscription: Subscription;
  private supplySubscription: Subscription;
  private votersNumber = 4;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,
    private _explorerService: ExplorerService,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService
  ) {
    this.subscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });
    this.supplySubscription = _currencyService.supplyChosen$.subscribe(supply => {
      this.supply = supply;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.onResize();
    this.showLoader = true;
    this.route.params.subscribe((params: Params) => {
      this._currentAddress = params['id'];

      this._explorerService.getAccount(this._currentAddress).subscribe(
        res => {
          this.addressItem = res.account;
          this._connectionService.changeConnection(res.success);
          window.scrollTo(0, 0);
          if (this.addressItem && this.addressItem.voters) {
            this.voters = this.addressItem.voters.sort((one, two) => two.balance - one.balance);
          }
        }
      );

      this._explorerService.getTransactionsByAddress(this._currentAddress, '').subscribe(
        res => {
          this._connectionService.changeConnection(res.success);
          this.currentTransactions = res.transactions;
          this.showLoader = false;
        }
      );
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.balanceContainer) {
      return;
    }
    const position = this.balanceContainer.nativeElement.getBoundingClientRect().bottom || 0;
    if (position < 85) {
      this.showBalanceFooter = true;
      this.document.body.classList.add('extra-footer');
    } else {
      this.showBalanceFooter = false;
      this.document.body.classList.remove('extra-footer');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width > 940) {
      this.votersNumber = 3;
    } else if (width > 700) {
      this.votersNumber = 2;
    } else {
      this.votersNumber = 1;
    }
  }

  getAllTransactions(event): void {
    this.showLoader = true;
    this.activeTab = event.target.id;
    this._explorerService.getTransactionsByAddress(this._currentAddress, '').subscribe(
      res => {
        this._connectionService.changeConnection(res.success);
        this.currentTransactions = res.transactions;
        this.showLoader = false;
      }
    );
  }

  getSentTransactions(event): void {
    this.showLoader = true;
    this.activeTab = event.target.id;
    this._explorerService.getTransactionsByAddress(this._currentAddress, 'sent').subscribe(
      res => {
        this._connectionService.changeConnection(res.success);
        this.currentTransactions = res.transactions;
        this.showLoader = false;
      }
    );
  }

  getReceivedTransactions(event): void {
    this.showLoader = true;
    this.activeTab = event.target.id;
    this._explorerService.getTransactionsByAddress(this._currentAddress, 'received').subscribe(
      res => {
        this._connectionService.changeConnection(res.success);
        this.currentTransactions = res.transactions;
        this.showLoader = false;
      }
    );
  }

  getVoters() {
    return this.areVotersExpanded ? this.voters : this.voters.slice(0, this.votersNumber);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.supplySubscription.unsubscribe();
    this.document.body.classList.remove('extra-footer');
  }
}
