import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Transaction} from '../../../models/transaction.model';

@Component({
  selector: 'ark-address-transactions',
  templateUrl: './address-transactions.component.html'
})
export class AddressTransactionsComponent implements OnInit {
  @Input() id: string;
  @Input() items: Transaction[];
  @Input() curName: string;
  @Input() curValue: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getAddressLink(id: string) {
    return ['/address', id];
  }
}
