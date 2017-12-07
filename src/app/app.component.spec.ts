import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ToggleBackgroundComponent } from './components/header/toggle-background/toggle-background.component';
import { CurrencyDropdownComponent } from './components/header/currency-dropdown/currency-dropdown.component';
import { ToolsDropdownComponent } from './components/header/tools-dropdown/tools-dropdown.component';
import { SocketHeaderService, SocketGraphService, SocketMonitorService } from './shared/services/socket.service';
import { CurrencyService } from './shared/services/currency.service';
import { HttpModule } from '@angular/http';
import { ThemeService } from './shared/services/theme.service';
import { ConnectionMessageService } from './shared/services/connection-message.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
   // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  //  jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ScrollTopComponent,
        ToggleBackgroundComponent,
        CurrencyDropdownComponent,
        ToolsDropdownComponent
      ],
      imports: [ 
        RouterTestingModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot()
      ],
      providers: [
        SocketHeaderService,
        SocketGraphService,
        SocketMonitorService,
        CurrencyService,
        ThemeService,
        ConnectionMessageService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
