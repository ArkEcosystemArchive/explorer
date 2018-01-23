import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
import { MomentModule } from 'angular2-moment';
import { ChartModule } from 'angular-highcharts';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { DelegateMonitorComponent } from './pages/delegate-monitor/delegate-monitor.component';
import { ToolsDropdownComponent } from './components/header/tools-dropdown/tools-dropdown.component';
import { BalanceFooterComponent } from './pages/address/balance-footer/balance-footer.component';
import { DatePipe, OverflowTextPipe } from './shared/pipes/general.pipe';
import { TopAccountsComponent } from './pages/top-accounts/top-accounts.component';
import { DelegatesComponent } from './pages/delegate-monitor/delegates/delegates.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ConnectionMessageService } from './shared/services/connection-message.service';
import { ToggleBackgroundComponent } from './components/header/toggle-background/toggle-background.component';
import { ThemeService } from './shared/services/theme.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { TogglePriceChartComponent } from './components/header/toggle-price-chart/toggle-price-chart.component';
import { AddressTableComponent } from './components/address-table/address-table.component';
import { VotersComponent } from './pages/address/voters/voters.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { ErrorSectionComponent } from './components/error-section/error-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    TransactionListComponent,
    TransactionTableComponent,
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
    TogglePriceChartComponent,
    AddressTableComponent,
    VotersComponent,
    PaginationComponent,
    ClipboardComponent,
    ErrorSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
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
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CurrencyService,
    ConnectionMessageService,
    ThemeService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
