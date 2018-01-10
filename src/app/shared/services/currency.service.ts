import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CurrencyModel } from '../../models/currency.model';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class CurrencyService {
  private currencySource = new Subject<CurrencyModel>();
  private supplySource = new Subject<number>();
  private heightSource = new Subject<number>();

  private _network: any = CONFIG.NETWORKS[CONFIG.NETWORK];

  currencyChosen$: Observable<CurrencyModel>;
  supplyChosen$: Observable<number>;
  heightChosen$: Observable<number>;

  constructor(
    private http: Http
  ) {
    this.currencyChosen$ = this.currencySource.asObservable();
    this.supplyChosen$ = this.supplySource.asObservable();
    this.heightChosen$ = this.heightSource.asObservable();

    this.getHeight().subscribe(height => {
      this.changeHeight(height.height);
    });
    this.getSupply().subscribe(supply => {
      this.changeSupply(supply.supply);
    });
  }

  changeCurrency(currency: string, value: number) {
    const i: CurrencyModel = {
      name: currency,
      value: value
    };
    this.currencySource.next(i);
  }

  changeSupply(value: number) {
    this.supplySource.next(value);
  }

  changeHeight(value: number) {
    this.heightSource.next(value);
  }

  getHeight(): Observable<any> {
    return this.http.get(`${this._network.NODE}/blocks/getHeight`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSupply(): Observable<any> {
    return this.http.get(`${this._network.NODE}/blocks/getSupply`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getPriceFor(currency: string) {
    if (this._network.PROPERTIES.indexOf('DISABLE_PRICE_API') !== -1) {
      return Observable.of({});
    }
    return this.http.get(`https://api.coinmarketcap.com/v1/ticker/ark/?convert=${currency}`)
      .map((res: Response) => res.json()[0])
      .catch((error: any) => Observable.throw(error.json()));
  }
}
