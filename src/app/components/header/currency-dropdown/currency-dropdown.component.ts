import { Component, OnInit, DoCheck, ElementRef, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CurrencyService } from '../../../shared/services/currency.service';
import { initCurrency } from '../../../shared/const/currency';

@Component({
  selector: 'ark-currency-dropdown',
  templateUrl: './currency-dropdown.component.html'
})
export class CurrencyDropdownComponent implements OnInit, DoCheck {
  public currency: any[] = [initCurrency.name];
  public currentCurrency: string = initCurrency.name;
  public elementRef;

  private _ratesObject: any;

  @Output() openMobMenu: EventEmitter<boolean> = new EventEmitter();

  @Input('rates') set rates(value: any) {
    this._updateRates(value, true);
  }

  get rates(): any {
    return this._ratesObject;
  }

  constructor(
    private myElement: ElementRef,
    private _currencyService: CurrencyService
  ) {
      this.elementRef = myElement;
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this._updateRates();
  }

  private _updateRates(value?: any, isInit: boolean = false) {
    value = value || this._ratesObject;
    this._ratesObject = value;
    // add ARK currency in array
    // this._ratesObject[this.initCurrency.name] = this.initCurrency.value;
    this.currency = Object.keys(this._ratesObject).sort();

    if (isInit) {
      // define currency on init
      setTimeout(() => {
        if (this.currency.length > 0) {
          const cur = localStorage.getItem('currency') || initCurrency.name;
          if (cur !== this.currentCurrency && this.currency.indexOf(cur) > -1) {
            this.setCurrency(cur);
          } else if (this.currency.indexOf(cur) === -1) {
            this.setCurrency(initCurrency.name);
          }
        }
      });
    }
  }

  showDropdown() {
    this.elementRef.nativeElement.children[0].classList.toggle('open');
  }

  setCurrency(currency: string, event?) {
    if (event) {
      event.preventDefault();
    }
    this.currentCurrency = currency;
    localStorage.setItem('currency', currency);
    this._currencyService.changeCurrency(currency, this.rates[currency]);
    this.openMobMenu.emit(false);
  }

  @HostListener('document:click', ['$event'])
  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
     } while (clickedComponent);

    if (!inside) {
      this.elementRef.nativeElement.children[0].classList.remove('open');
    }
  }

}
