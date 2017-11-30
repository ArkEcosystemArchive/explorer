import { Component, HostBinding } from '@angular/core';
import { WebsocketsService } from './shared/services/websockets.service';
import { CurrencyService } from './shared/services/currency.service';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [WebsocketsService]
})
export class AppComponent {

  public socketData: any;
  @HostBinding('class.dark-theme') isDarkTheme: boolean;

  constructor(
    private _socketService: WebsocketsService,
    private _currencyService: CurrencyService,
    private _themeService: ThemeService,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'ua']);
    translate.setDefaultLang('en');

    _themeService.isDarkThemeChange$.subscribe((data) => {
      this.isDarkTheme = data;
    });

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ua/) ? browserLang : 'en');

    _socketService.getHeaderData().subscribe(
      (data: any) => {
        this.socketData = data;
        if (data && data.status) {
          this._currencyService.changeSupply(data.status.supply);
          this._currencyService.changeHeight(data.status.height);
        }
      }
    );
  }
}
