import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CurrencyModel } from '../../models/currency.model';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import {BlockHeightResponse, BlockSupplyResponse} from '../../models/block.model';

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
    private http: HttpClient
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

  getHeight(): Observable<BlockHeightResponse> {
    return this.http.get<BlockHeightResponse>(`${this._network.NODE}/blocks/getHeight`)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getSupply(): Observable<BlockSupplyResponse> {
    return this.http.get<BlockSupplyResponse>(`${this._network.NODE}/blocks/getSupply`)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getPriceFor(currency: string) {
    if (this._network.PROPERTIES.indexOf('DISABLE_PRICE_API') !== -1) {
      return Observable.of({});
    }
    return this.http.get(`https://api.coinmarketcap.com/v1/ticker/ark/?convert=${currency}`)
      .map((res: Response) => res[0])
      .catch((error: any) => Observable.throw(error));
  }
}
