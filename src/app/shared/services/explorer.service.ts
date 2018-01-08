import {TransactionResponse, TransactionsResponse} from '../../models/transaction.model';
import {Account, AccountResponse, AccountsResponse} from '../../models/account.model';
import {BlockResponse, BlocksResponse} from '../../models/block.model';
import {Delegate} from '../../models/delegate.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class ExplorerService {

  private static _delegateTimer = null;
  private static _delegates: Subject<Delegate[]> = new BehaviorSubject({});

  constructor(
    private http: Http
  ) {
    this.startDelegateMonitor();
  }

  public startDelegateMonitor() {
    if (ExplorerService._delegateTimer) {
      return;
    }

    this._getDelegatesByPublicKey().subscribe(delegates => {
      ExplorerService._delegates.next(delegates);
    });

    ExplorerService._delegateTimer = setInterval(() => {
      this._getDelegatesByPublicKey().subscribe(delegates => {
        ExplorerService._delegates.next(delegates);
      });
    }, 600000);
  }

  // public getLastTransactions(): Observable<TransactionsResponse> {
  public getLastTransactions(): Observable<any> {
    let lastTransactions = [];

    return this.http.get(`${CONFIG.NODE}/transactions?orderBy=timestamp:desc&limit=20`)
      .map((res: any) => res.json().transactions)
      .flatMap((transactions: any) => {
        lastTransactions = transactions;

        const requests = [];

        transactions.forEach(transaction => {
          requests.push(this.getDelegate(transaction.senderPublicKey));
        });

        return Observable.forkJoin(requests);
      })
      .map((data: any[]) => {
        return data.map((res, index) => {
          const item = lastTransactions[index];

          item.senderDelegate = res;

          return item;
        });
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  // public getLastBlocks(n?: number): Observable<BlocksResponse> {
  public getLastBlocks(offset?: number): Observable<any> {
    let lastBlocks = [];
    return this.http.get(`${CONFIG.NODE}/blocks?orderBy=height:desc&limit=20&offset=${offset}`)
      .map((res: any) => res.json().blocks)
      .flatMap((blocks: any) => {

        lastBlocks = blocks;

        const requests = [];
        blocks.forEach(block => {
          requests.push(this.getDelegate(block.generatorPublicKey));
        });

        return Observable.forkJoin(requests);
      })
      .map((data: any[]) => {
        return data.map((res, index) => {
          const item = lastBlocks[index];
          item.delegate = res;

          return item;
        });
      })
      .map((blocks: any[]) => {
        const height = blocks[0].height;

        const pagination = {
          currentPage: Math.round(offset / 20) + 1,
          before: false,
          more: false,
          previousPage: 1,
          nextPage: 2
        };

        let totalPages = Math.round(height / 20);
        if (totalPages < height / 20) { totalPages++; }

        if (pagination.currentPage < totalPages) {
            pagination.before = true;
            pagination.previousPage = pagination.currentPage + 1;
        }

        if (pagination.currentPage > 0) {
            pagination.more = true;
            pagination.nextPage = pagination.currentPage - 1;
        }

        return {
          blocks: blocks,
          pagination: pagination
        }
      });
  }

  // public getAccount(address: any): Observable<AccountResponse> {
  public getAccount(address: any): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/accounts?address=${address}`)
      .map((res: Response) => res.json());
  }

  public getTopAccounts(limit: number, offset: number): Observable<AccountsResponse> {
    return this.http.get(`${CONFIG.NODE}/accounts/top?limit=${limit}&offset=${offset}`)
      .map((res: Response) => res.json());

  }

  public getTransactionsByAddress(address: any): Observable<any> {
    let transactions = [];

    return this.http.get(`${CONFIG.NODE}/transactions?senderId=${address}&recipientId=${address}&limit=50&offset=0&orderBy=timestamp:desc`)
      .flatMap((res: any) => {
        transactions = res.json().transactions;

        const requests = [];

        transactions.forEach(transaction => {
          if (transaction.senderPublicKey) {
            requests.push(this.getDelegate(transaction.senderPublicKey));
          }
        });

        return Observable.forkJoin(requests)
      })
      .map((data: any[]) => {
        return data.map((res, index) => {
          const item = transactions[index];
          item.senderDelegate = res;

          return item;
        });
      });
  }

  public getSendTransactionsByAddress(address: any): Observable<any> {
    let transactions = [];

    return this.http.get(`${CONFIG.NODE}/transactions?senderId=${address}&limit=50&offset=0&orderBy=timestamp:desc`)
      .flatMap((res: any) => {
        transactions = res.json().transactions;

        const requests = [];

        transactions.forEach(transaction => {
          if (transaction.senderPublicKey) {
            requests.push(this.getDelegate(transaction.senderPublicKey));
          }
        });

        return Observable.forkJoin(requests)
      })
      .map((data: any[]) => {
        return data.map((res, index) => {
          const item = transactions[index];
          item.senderDelegate = res;

          return item;
        });
      });
  }

  public getReceivedTransactionsByAddress(address: any): Observable<any> {
    let transactions = [];

    return this.http.get(`${CONFIG.NODE}/transactions?recipientId=${address}&limit=50&offset=0&orderBy=timestamp:desc`)
      .flatMap((res: any) => {
        transactions = res.json().transactions;

        const requests = [];

        transactions.forEach(transaction => {
          if (transaction.senderPublicKey) {
            requests.push(this.getDelegate(transaction.senderPublicKey));
          }
        });

        return Observable.forkJoin(requests)
      })
      .map((data: any[]) => {
        return data.map((res, index) => {
          const item = transactions[index];
          item.senderDelegate = res;

          return item;
        });
      });
  }

  public getTransaction(id: any): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/transactions/get?id=${id}`)
      .map((res: Response) => {
        const transaction = res.json().transaction;

        this.getDelegate(transaction.senderPublicKey).subscribe(res => {
          transaction.senderDelegate = res;
        })

        return transaction;
      });
  }

  public getSendByAddressCount(address: string): Observable<any> {
    return this.http
      .get(`${CONFIG.NODE}/transactions?senderId=${address}&limit=1`)
      .map((res: Response) => (res.json().count))
  }

  public getReceivedByAddressCount(address: string): Observable<any> {
    return this.http
      .get(`${CONFIG.NODE}/transactions?recipientId=${address}&limit=1`)
      .map((res: Response) => (res.json().count))
  }

  // public getBlock(id: any): Observable<BlockResponse> {
  public getBlock(id: any): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/blocks/get?id=${id}`)
      .map((res: any) => res.json().block)
      .flatMap((block: any) => {
        return this.getDelegate(block.generatorPublicKey)
          .map((res: any) => {
            block.delegate = res;
            return block;
          });
      });
  }

  public getTransactionsByBlock(id: any): Observable<TransactionsResponse> {
    return this.http.get(`${CONFIG.NODE}/transactions?blockId=${id}&limit=50&offset=0`)
      .map((res: Response) => res.json());
  }

  public getDelegate(publickey: string) {
    return new Observable<Delegate>(observer => {
      ExplorerService._delegates.subscribe(delegates => {
        if (Object.keys(delegates).length !== 0) {
          if (delegates.hasOwnProperty(publickey)) {
            observer.next(delegates[publickey]);
            observer.complete();
          } else {
            observer.next();
            observer.complete();
          }
        }
      });
    });
  }

  public getDelegateVotes(address: string) {
    return this.http.get(`${CONFIG.NODE}/accounts/delegates?address=${address}`)
      .map((res: Response) => res.json().delegates);
  }

  public getDelegateVoters(publickey: string) {
    return this.http.get(`${CONFIG.NODE}/delegates/voters?publicKey=${publickey}`)
      .map((res: Response) => res.json().accounts);
  }

  // monitor
  public getStandby(n: number): Observable<any> {
    // return this.http.get(`${CONFIG.API}/delegates/getStandby?n=${n}`)
    return this.http.get(`${CONFIG.NODE}/delegates?offset=51`)
      .map((res: Response) => res.json());
  }

  //
  // WEBSOCKET REPLACEMENT - JUST KEEP IT RUNNING!
  //

public getActiveDelegates(nextForgers, blocks): Observable<any> {
    let totalCount = null;
    let activeDelegates = null;

    return this.http.get(`${CONFIG.NODE}/delegates/?orderBy=rate:asc&limit=51`)
      .map((res: any) => res.json())
      // get forged for each delegate
      .flatMap((res: any) => {
        totalCount = res.totalCount;
        activeDelegates = res.delegates;

        const requests = [];

        activeDelegates.forEach(delegate => {
          requests.push(
            this.http.get(`${CONFIG.NODE}/delegates/forging/getForgedByAccount?generatorPublicKey=${delegate.publicKey}`)
          );
        });

        return Observable.forkJoin(requests);
      })
      .map((requests: any) => {
        return requests.map(res => {
          const item = activeDelegates.filter(
            delegate => (delegate.publicKey === res.url.slice(-66))
          )[0]

          item.forged = +res.json().forged;

          return item;
        });
      })
      .flatMap(delegates => {
        return Observable.forkJoin(delegates.map(delegate => {
          return this
          .getLastBlockByPublicKey(delegate.publicKey, blocks)
          .map((lastBlock: any) => {
            delegate.blocks = [lastBlock];
            delegate.blocksAt = lastBlock.timestamp;

            const delegateIndex = nextForgers.findIndex(d => d.publicKey === delegate.publicKey);
            delegate.forgingTime = delegateIndex * 8;
            delegate.isRoundDelegate = delegateIndex !== -1;

            return delegate;
          });
        }));
      })
      .map(delegates => {
        return {
          delegates: delegates,
          totalCount: totalCount,
        };
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private getLastBlockByPublicKey(publicKey, blocks): Observable<any>
  {
    const lastBlock = blocks.find(v => (v.generatorPublicKey === publicKey));

    if (lastBlock && lastBlock.hasOwnProperty('timestamp')) {
      return Observable.of(lastBlock);
    } else {
      return this.http
        .get(`${CONFIG.NODE}/blocks?orderBy=height:desc&limit=1&generatorPublicKey=${publicKey}`)
        .map((res: any) => res.json().blocks[0]);
    }
  }

  public getForgedByPublicKey(publicKey): Observable<any>
  {
    return this.http
      .get(`${CONFIG.NODE}/delegates/forging/getForgedByAccount?generatorPublicKey=${publicKey}`)
      .map((res: any) => res.json().forged);
  }

  public getLatestBlocks(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/blocks?orderBy=height:desc&limit=51`)
      .map((res: any) => res.json().blocks)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLastBlock(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/blocks?orderBy=height:desc&limit=1`)
      .map((res: any) => res.json().blocks[0])
      .flatMap((block: any) => {
        return this.getDelegate(block.generatorPublicKey)
          .map((res: any) => {
            block.delegate = res;
            return block;
          });
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getNextForgers(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/delegates/getNextForgers?limit=51`)
      .map((res: any) => res.json().delegates)
      .flatMap((delegates: any) => {
        const requests = [];

        delegates.forEach(delegate => {
          requests.push(this.getDelegate(delegate));
        });

        return Observable.forkJoin(requests);
      })
      // .map((data: any[]) => {
      //   return data.map(res => res);
      // })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLatestRegistrations(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/transactions/?orderBy=timestamp:desc&limit=5&type=2`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getLatestVotes(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/transactions/?orderBy=timestamp:desc&limit=5&type=3`)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getDelegatesByPublicKey(): Observable<any> {
    return ExplorerService._delegates;
  }

  private _getDelegatesByPublicKey(): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/delegates?limit=51`)
      .map((res: any) => res.json())
      .flatMap((res: any) => {
        const requests = [];

        for (
          let index = 0;
          index < Math.ceil(res.totalCount / 51);
          index++
        ) {
          requests.push(
            this.http.get(`${CONFIG.NODE}/delegates?limit=51&offset=${index * 51}`)
          );
        }

        return Observable.forkJoin(requests);
      })
      .map((requests: any) => {
        return requests.map(res => {
          return res.json().delegates;
        }).reduce((a, b) => [...a, ...b]);
      })
      .flatMap((delegates: any[]) => {
        let delegateList = {};
        delegates.map(delegate => {
          let delegateObj = new Delegate();
          Object.assign(delegateObj, delegate);
          delegateList[delegate.publicKey] = delegateObj;
        });

        return Observable.of(delegateList);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public searchByAddress(value: string): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/accounts?address=${value}`)
      .map((res: Response) => res.json());
  }

  public searchByUsername(value: string): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/delegates/get?username=${value}`)
      .map((res: Response) => res.json());
  }

  public searchByBlockId(value: string): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/blocks/get?id=${value}`)
      .map((res: Response) => res.json());
  }

  public searchByTransactionId(value: string): Observable<any> {
    return this.http.get(`${CONFIG.NODE}/transactions/get?id=${value}`)
      .map((res: Response) => res.json());
  }
}
