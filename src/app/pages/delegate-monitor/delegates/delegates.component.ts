import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ark-delegates',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.less']
})
export class DelegatesComponent implements OnInit {
  @Input() list: any;
  @Input() set delegates(value: any[]) {
    this.list = value;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortDelegates(null, this.sortColumn);
  }
  @Input() curValue: number;
  @Input() curName: string;
  @Input() active: boolean = true;

  private sortColumn: string = 'rank';
  private sortDirection: string = 'asc';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAddress(event, id: string) {
    event.preventDefault();
    this.router.navigate(['/address', id]);
  }

  sortDelegates(event, column: string) {
    if (event) event.preventDefault();

    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') this.sortDirection = 'desc';
      else this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sortColumn = column;

    if (column === 'rate') {
      this.list.sort((a, b): number => {
        if (a.rate < b.rate)      return this.sortDirection === 'asc' ? 1 : -1;
        else if (a.rate > b.rate) return this.sortDirection === 'asc' ? -1 : 1;
        return 0;
      });
    } else if (column === 'username') {
      this.list.sort((a, b): number => {
        if (a.username < b.username)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.username > b.username) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'forged') {
      this.list.sort((a, b): number => {
        if (Number(a.forged) < Number(b.forged))      return this.sortDirection === 'asc' ? -1 : 1;
        else if (Number(a.forged) > Number(b.forged)) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'forgingTime') {
      this.list.sort((a, b): number => {
        if (a.forgingTime < b.forgingTime)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.forgingTime > b.forgingTime) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'productivity') {
      this.list.sort((a, b): number => {
        if (a.productivity < b.productivity)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.productivity > b.productivity) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (column === 'approval') {
      this.list.sort((a, b): number => {
        if (a.approval < b.approval)      return this.sortDirection === 'asc' ? -1 : 1;
        else if (a.approval > b.approval) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

}
