import { Component, Renderer2 } from '@angular/core';
import { WebsocketsService } from './shared/services/websockets.service';
import { CurrencyService } from './shared/services/currency.service';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ark-app',
  templateUrl: './app.component.html',
  providers: [WebsocketsService]
})
export class AppComponent {

  public socketData: any;
  public isDarkTheme: boolean;

  constructor(
    private _socketService: WebsocketsService,
    private _currencyService: CurrencyService,
    private _themeService: ThemeService,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    translate.addLangs(['en', 'ua']);
    translate.setDefaultLang('en');

    _themeService.isDarkThemeChange$.subscribe((data) => {
      this.isDarkTheme = data;
      if (this.isDarkTheme) {
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
      }
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
