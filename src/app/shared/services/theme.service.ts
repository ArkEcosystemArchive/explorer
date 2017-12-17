import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ThemeService {

  private isDarkThemeActive: boolean;
  public isDarkThemeChange$: BehaviorSubject<boolean>;

  private isPriceChartVisible: boolean;
  public isPriceChartChange$: BehaviorSubject<boolean>;

  public displayTogglePriceChartSwitch = false;

  constructor(private _localStorageService: LocalStorageService) {
    this.initializeDarkThemeSettings();
    this.initializePriceChartSettings();
  }

  toggleTheme() {
    this.isDarkThemeActive = !this.isDarkThemeActive;
    this._localStorageService.setValue('isDarkTheme', this.isDarkThemeActive);
    this.isDarkThemeChange$.next(this.isDarkThemeActive);
  }

  togglePriceChart() {
    this.isPriceChartVisible = !this.isPriceChartVisible;
    this._localStorageService.setValue('isPriceChartHidden', !this.isPriceChartVisible);
    this.isPriceChartChange$.next(this.isPriceChartVisible);
  }

  private initializeDarkThemeSettings(): void {
    const isDarkThemeActive = this._localStorageService.getValue('isDarkTheme');
    this.isDarkThemeActive = isDarkThemeActive !== null ? isDarkThemeActive : false;
    this.isDarkThemeChange$ = new BehaviorSubject(this.isDarkThemeActive);
  }

  private initializePriceChartSettings(): void {
    const isPriceChartHidden = this._localStorageService.getValue('isPriceChartHidden');
    this.isPriceChartVisible = isPriceChartHidden !== null ? !isPriceChartHidden : true;
    this.isPriceChartChange$ = new BehaviorSubject(this.isPriceChartVisible);
  }
}
