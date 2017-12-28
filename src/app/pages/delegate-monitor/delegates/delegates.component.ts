import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ark-delegates',
  templateUrl: './delegates.component.html'
})
export class DelegatesComponent implements OnInit {
  @Input() list: any;
  @Input() curValue: number;
  @Input() curName: string;
  @Input() active = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
