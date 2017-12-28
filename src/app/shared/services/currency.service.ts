import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CurrencyModel } from '../../models/currency.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class CurrencyService {
  private currencySource = new Subject<CurrencyModel>();
  private supplySource = new Subject<number>();
  private heightSource = new Subject<number>();

  currencyChosen$: Observable<CurrencyModel>;
  supplyChosen$: Observable<number>;
  heightChosen$: Observable<number>;

  constructor(
    private http: Http
  ) {
    this.currencyChosen$ = this.currencySource.asObservable();
    this.supplyChosen$ = this.supplySource.asObservable();
    this.heightChosen$ = this.heightSource.asObservable();

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

  public getGBPprice() {
    return this.http.get(`https://api.cryptonator.com/api/ticker/ark-gbp`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

}
