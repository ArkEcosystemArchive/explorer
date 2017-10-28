import { Component, OnInit, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyService } from '../../../shared/services/currency.service';
import { initCurrency } from '../../../shared/const/currency';

@Component({
  selector: 'ark-currency-dropdown',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.less']
})
export class CurrencyDropdownComponent implements OnInit {
  public currency: any[] = [initCurrency.name];
  public currentCurrency: string = initCurrency.name;
  public elementRef;

  private _ratesObject: any;

  @Output() openMobMenu: EventEmitter<boolean> = new EventEmitter();

  @Input('rates') set rates(value: any) {
    this._ratesObject = value;
    // add ARK currency in array
    this._ratesObject[initCurrency.name] = initCurrency.value;
    this.currency = Object.keys(this._ratesObject).sort();

    // define currency on init
    setTimeout(_ => {
      if(this.currency.length > 1) {
        let cur = localStorage.getItem('currency') || initCurrency.name;
        if (cur != this.currentCurrency) {
          this.setCurrency(cur);
        }
      }
    });

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

  showDropdown() {
    this.elementRef.nativeElement.children[0].classList.toggle('open');
  }

  setCurrency(currency: string, event?){
    if(event) {
      event.preventDefault();
    }
    this.currentCurrency = currency;
    localStorage.setItem('currency', currency);
    this._currencyService.changeCurrency(currency, this.rates[currency]);
    this.openMobMenu.emit(false);
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
     } while (clickedComponent);
    
    if (!inside){
      this.elementRef.nativeElement.children[0].classList.remove('open');
    } 
  }

}
