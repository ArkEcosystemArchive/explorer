import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ThemeService {

  private isDarkThemeSource: boolean;
  public isDarkThemeChange$: BehaviorSubject<boolean>;

  constructor() {
    const source = localStorage.getItem('isDarkTheme');
    this.isDarkThemeSource = source ? JSON.parse(source) : false;
    this.isDarkThemeChange$ = new BehaviorSubject(this.isDarkThemeSource);
  }

  toggleTheme() {
    this.isDarkThemeSource = !this.isDarkThemeSource;
    localStorage.setItem('isDarkTheme', String(this.isDarkThemeSource));
    this.isDarkThemeChange$.next(this.isDarkThemeSource);
  }

}
