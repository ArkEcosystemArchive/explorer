import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'ark-toggle-price-chart',
  templateUrl: './toggle-price-chart.component.html',
  styleUrls: ['../shared/toggle-switch.styles.less']
})
export class TogglePriceChartComponent {

  public isVisible: boolean;

  constructor(private _themeService: ThemeService) {
    this._themeService.isPriceChartChange$.subscribe((isVisible) => this.isVisible = isVisible);
  }

  togglePriceChart() {
    this._themeService.togglePriceChart();
  }
}
