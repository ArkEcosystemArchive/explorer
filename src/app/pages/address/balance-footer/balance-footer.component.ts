import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ark-balance-footer',
  templateUrl: './balance-footer.component.html',
  styleUrls: ['./balance-footer.component.less']
})
export class BalanceFooterComponent implements OnInit {

  @Input() show = false;
  @Input() address = '';
  @Input() balance: number;
  @Input() curName: string;
  @Input() curVal: number;

  constructor() { }

  ngOnInit() {
  }

}
