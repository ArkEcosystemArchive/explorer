import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ark-address-transactions',
  templateUrl: './address-transactions.component.html',
  styleUrls: ['./address-transactions.component.less']
})
export class AddressTransactionsComponent implements OnInit {
  @Input() id: string;
  @Input() items: any[];
  @Input() curName: string;
  @Input() curValue: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getAddressLink(id: string) {
    return ['/address', id];
  }
}
