import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'ark-toggle-background',
  templateUrl: './toggle-background.component.html',
  styleUrls: ['../shared/toggle-switch.styles.less']
})
export class ToggleBackgroundComponent implements OnInit {

  public isDarkTheme: boolean;

  constructor(private _themeService: ThemeService) {
    this._themeService.isDarkThemeChange$.subscribe((data) => this.isDarkTheme = data);
  }

  toggleBackground() {
    this._themeService.toggleTheme();
  }

  ngOnInit() {
  }

}
