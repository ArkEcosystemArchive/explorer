import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CurrencyModel } from '../../models/currency.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class CurrencyService {
  private currencySource = new Subject<CurrencyModel>();
  private supplySourse = new Subject<number>();
  private heightSourse = new Subject<number>();

  constructor(
    private http: Http
  ) { }

  currencyChoosen$ = this.currencySource.asObservable();
  supplyChoosen$ = this.supplySourse.asObservable();
  heightChoosen$ = this.heightSourse.asObservable();

  changeCurrency(currency: string, value: number) {
    let i: CurrencyModel = {
      name: currency,
      value: value
    };
    this.currencySource.next(i);
  }

  changeSupply(value: number) {
    this.supplySourse.next(value);
  }

  changeHeight(value: number) {
    this.heightSourse.next(value);
  }

  public getCNYprice() {
    return this.http.get(`https://api.cryptonator.com/api/ticker/ark-cny`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  public getGBPprice() {
    return this.http.get(`https://api.cryptonator.com/api/ticker/ark-gbp`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

}
