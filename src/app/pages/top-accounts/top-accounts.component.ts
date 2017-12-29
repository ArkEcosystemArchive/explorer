import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../shared/services/explorer.service';

@Component({
  selector: 'ark-top-accounts',
  templateUrl: './top-accounts.component.html',
  providers: [ExplorerService]
})
export class TopAccountsComponent implements OnInit {

  constructor(public explorerService: ExplorerService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
