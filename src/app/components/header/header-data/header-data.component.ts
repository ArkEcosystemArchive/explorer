import { Component, Input } from '@angular/core';


@Component({
  selector: 'ark-header-data',
  templateUrl: './header-data.component.html',
  styleUrls: ['./header-data.component.less']
})
export class HeaderDataComponent {
  @Input()
  public headerHeight: number;

  @Input()
  public headerSupply: number;

  @Input()
  public headerNethash: string;

  @Input()
  public currencies: string[];
}
