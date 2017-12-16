import {TransactionResponse, TransactionsResponse} from '../../models/transaction.model';
import {Account, AccountResponse, AccountsResponse} from '../../models/account.model';
import {BlockResponse, BlocksResponse} from '../../models/block.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  public getLastTransactions(): Observable<TransactionsResponse> {
    return this.http.get(`${CONFIG.API}/getLastTransactions`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLastBlocks(n?: number): Observable<BlocksResponse> {
    const params = (n >= 0) ? `?n=${n}` : '';
    return this.http.get(`${CONFIG.API}/getLastBlocks${params}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  public getAccount(address: any): Observable<AccountResponse> {
    return this.http.get(`${CONFIG.API}/getAccount?address=${address}`)
      .map((res: Response) => res.json())
      .map((res: any) => {
        // note: on this API call the success and the actual data is on the same object...
        const accountRes = new AccountResponse();
        accountRes.success = res.success;
        accountRes.account = res as Account;
        return accountRes;
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTopAccounts(limit: number, offset: number): Observable<AccountsResponse> {
    return this.http.get(`${CONFIG.API}/getTopAccounts?limit=${limit}&offset=${offset}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransactionsByAddress(address: any, direction: string): Observable<TransactionsResponse> {
    const addressParam = direction ? `&direction=${direction}` : '';
    return this.http.get(`${CONFIG.API}/getTransactionsByAddress?address=${address}${addressParam}&limit=50&offset=0`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransaction(id: any): Observable<TransactionResponse> {
    return this.http.get(`${CONFIG.API}/getTransaction?transactionId=${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getBlock(id: any): Observable<BlockResponse> {
    return this.http.get(`${CONFIG.API}/getBlock?blockId=${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  public getTransactionsByBlock(id: any): Observable<TransactionsResponse> {
    return this.http.get(`${CONFIG.API}/getTransactionsByBlock?blockId=${id}&limit=50&offset=0`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });

  }

  // search
  public search(address: string) {
    return this.http.get(`${CONFIG.API}/search?id=${address}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  // monitor
  public getStandby(n: number): Observable<any> {
    return this.http.get(`${CONFIG.API}/delegates/getStandby?n=${n}`)
      .map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

}
