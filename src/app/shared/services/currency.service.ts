import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CurrencyModel } from '../../models/currency.model';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import {BlockHeightResponse, BlockSupplyResponse} from '../../models/block.model';
import { Network } from '../../models/network-config.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class CurrencyService {
  private currencySource = new ReplaySubject<CurrencyModel>(1);
  private supplySource = new ReplaySubject<number>(1);
  private heightSource = new ReplaySubject<number>(1);

  private _network: Network = CONFIG.activeNetwork;

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
    return this.http.get<BlockHeightResponse>(`${this._network.node}/blocks/getHeight`)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  getSupply(): Observable<BlockSupplyResponse> {
    return this.http.get<BlockSupplyResponse>(`${this._network.node}/blocks/getSupply`)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getPriceFor(currency: string) {
    if (this._network.properties.disablePriceApi) {
      return Observable.of({});
    }
    return this.http.get(`https://api.coinmarketcap.com/v1/ticker/ark/?convert=${currency}`)
      .map((res: Response) => res[0])
      .catch((error: any) => Observable.throw(error));
  }
}
