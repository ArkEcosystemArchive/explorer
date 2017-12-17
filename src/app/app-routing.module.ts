import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorerComponent } from './pages/explorer/explorer.component';
import { BlockListComponent } from './pages/block-list/block-list.component';
import { AddressComponent } from './pages/address/address.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { BlockComponent } from './pages/block/block.component';
import { ActivityGraphComponent } from './pages/activity-graph/activity-graph.component';
import { DelegateMonitorComponent } from './pages/delegate-monitor/delegate-monitor.component';
import { TopAccountsComponent } from './pages/top-accounts/top-accounts.component';

const appRoutes: Routes = [
  { path: '', component: ExplorerComponent, pathMatch: 'full' },
  { path: 'blocks/:page', component: BlockListComponent },
  { path: 'address/:id', component: AddressComponent },
  { path: 'tx/:id', component: TransactionComponent },
  { path: 'block/:id', component: BlockComponent },
  { path: 'activityGraph', component: ActivityGraphComponent },
  { path: 'delegateMonitor', component: DelegateMonitorComponent },
  { path: 'topAccounts', component: TopAccountsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
