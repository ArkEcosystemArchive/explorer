import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ark-address-transactions',
  templateUrl: './address-transactions.component.html',
  styleUrls: ['./address-transactions.component.less']
})
export class AddressTransactionsComponent implements OnInit {
  @Input() id: string;
  private items: any[];
  @Input() set itemsArray(value: any[]) {
    this.items = value;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortTransactions(null, this.sortColumn);
  }
  @Input() curName: string;
  @Input() curValue: number;

  private sortColumn: string = 'timestamp';
  private sortDirection: string = 'asc';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAddress(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/address', id]);
  }

  goToBlock(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/block', id]);
  }

  goToTransaction(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/tx', id]);
  }

  sortTransactions(event, column: string) {
    if (event) event.preventDefault();

    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') this.sortDirection = 'desc';
      else this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;

    if (column === 'timestamp') {
      this.items.sort((a, b): number => {
        if (a.timestamp < b.timestamp)      return this.sortDirection === 'asc' ? 1 : -1;
        else if (a.timestamp > b.timestamp) return this.sortDirection === 'asc' ? -1 : 1;
        return 0;
      });
    } else if (column === 'amount') {
      this.items.sort((a, b): number => {
        if (a.amount < b.amount)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.amount > b.amount) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'fee') {
      this.items.sort((a, b): number => {
        if (a.fee < b.fee)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.fee > b.fee) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'confirmations') {
      this.items.sort((a, b): number => {
        if (a.confirmations < b.confirmations)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.confirmations > b.confirmations) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

}
