import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';


@Injectable()
export class ExplorerService {

  constructor(
    private http: Http
  ) { }

  public getLastTransactions(): Observable<any> {
    return this.http.get(`${CONFIG.API}/getLastTransactions`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLastBlocks(n?: number): Observable<any> {
    let params = (n >= 0) ? `?n=${n}` : '';
    return this.http.get(`${CONFIG.API}/getLastBlocks${params}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  public getAccount(address: any): Observable<any> {
    return this.http.get(`${CONFIG.API}/getAccount?address=${address}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTopAccounts(limit: number, offset: number): Observable<any> {
    return this.http.get(`${CONFIG.API}/getTopAccounts?limit=${limit}&offset=${offset}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransactionsByAddress(address: any, direction: string): Observable<any> {
    let addressParam = direction ? `&direction=${direction}` : '';
    return this.http.get(`${CONFIG.API}/getTransactionsByAddress?address=${address}${addressParam}&limit=50&offset=0`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransaction(id: any): Observable<any> {
    return this.http.get(`${CONFIG.API}/getTransaction?transactionId=${id}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getBlock(id: any): Observable<any> {
    return this.http.get(`${CONFIG.API}/getBlock?blockId=${id}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransactionsByBlock(id: any): Observable<any> {
    return this.http.get(`${CONFIG.API}/getTransactionsByBlock?blockId=${id}&limit=50&offset=0`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  // search
  public search(address: string) {
    return this.http.get(`${CONFIG.API}/search?id=${address}`)
      .map((res: Response) => { return res.json(); })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //monitor
  public getStandby(n: number): Observable<any> {
    return this.http.get(`${CONFIG.API}/delegates/getStandby?n=${n}`)
      .map((res: Response) => { 
        return res.json(); 
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

}
