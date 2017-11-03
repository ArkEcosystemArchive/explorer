import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { QRCodeModule } from 'angular2-qrcode';
import { MomentModule } from 'angular2-moment';
import { ChartModule } from 'angular-highcharts';
import { ClipboardModule } from 'ngx-clipboard';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CONFIG } from './app.config';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExplorerComponent } from './pages/explorer/explorer.component';
import { CurrencyDropdownComponent } from './components/header/currency-dropdown/currency-dropdown.component';
import { BlockListComponent } from './pages/block-list/block-list.component';
import { AddressComponent } from './pages/address/address.component';
import { AddressTransactionsComponent } from './pages/address/address-transactions/address-transactions.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { BlockComponent } from './pages/block/block.component';
import { CurrencyService } from './shared/services/currency.service';
import { ActivityGraphComponent } from './pages/activity-graph/activity-graph.component';
import { SocketHeaderService, SocketGraphService, SocketMonitorService } from './shared/services/socket.service';
import { DelegateMonitorComponent } from './pages/delegate-monitor/delegate-monitor.component';
import { ToolsDropdownComponent } from './components/header/tools-dropdown/tools-dropdown.component';
import { BalanceFooterComponent } from './pages/address/balance-footer/balance-footer.component';

import { DatePipe, OverflowTextPipe, CurrencyFormatPipe } from './shared/pipes/general.pipe';
import { TopAccountsComponent } from './pages/top-accounts/top-accounts.component';
import { DelegatesComponent } from './pages/delegate-monitor/delegates/delegates.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ConnectionMessageService } from './shared/services/connection-message.service';
import { ToggleBackgroundComponent } from './components/header/toggle-background/toggle-background.component';
import { ThemeService } from './shared/services/theme.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/translate/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExplorerComponent,
    CurrencyDropdownComponent,
    BlockListComponent,
    AddressComponent,
    AddressTransactionsComponent,
    TransactionComponent,
    BlockComponent,
    ActivityGraphComponent,
    DelegateMonitorComponent,
    ToolsDropdownComponent,
    BalanceFooterComponent,
    DatePipe,
    OverflowTextPipe,
    TopAccountsComponent,
    DelegatesComponent,
    ScrollTopComponent,
    ToggleBackgroundComponent,
    CurrencyFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    QRCodeModule,
    FormsModule,
    HttpModule,
    MomentModule,
    ChartModule,
    ClipboardModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    CurrencyService,
    ConnectionMessageService,
    SocketHeaderService,
    SocketGraphService,
    SocketMonitorService,
    ThemeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
