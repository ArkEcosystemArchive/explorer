import {
  PaginatedTransactions, Transaction, TransactionRequestParameters, TransactionResponse,
  TransactionsResponse
} from '../../models/transaction.model';
import {Account, AccountResponse, AccountsResponse} from '../../models/account.model';
import {Delegate, DelegateResponse, DelegatesForgersResponse, DelegatesResponse, ForgingResponse} from '../../models/delegate.model';
import {Block, BlockResponse, BlocksResponse, PaginatedBlocks} from '../../models/block.model';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../app.config';
import { Pagination } from '../../models/pagination.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

@Injectable()
export class ExplorerService {

  private static _delegateTimer = null;
  private static _delegates: Subject<Delegate[]> = new BehaviorSubject([]);

  private _network: any = {};
  private _updateForgedBlockFreqMS = 440000;

  private _delegateLastForgedData = {
    lastUpdated: new Date(0),
    data: [],
  };
  private _delegateLastBlockData = {
    lastUpdated: new Date(0),
    data: [],
  };

  constructor(private http: HttpClient) {
    this._network = CONFIG.NETWORKS[CONFIG.NETWORK];

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
  public getLastTransactions = (parameters?: TransactionRequestParameters): Observable<PaginatedTransactions> => {
    if (!parameters) {
      parameters = {};
    }

    const limit = parameters.limit || 20;
    const offset = parameters.offset || 0;

    // request one item more than the actual limit is, so we know if there's a next page
    let requestURl = `${this._network.NODE}/transactions?orderBy=timestamp:desc&limit=${limit + 1}&offset=${offset ? offset : 0}`;

    if (parameters.senderId) {
      requestURl += '&senderId=' + parameters.senderId;
    }

    if (parameters.recipientId) {
      requestURl += '&recipientId=' + parameters.recipientId;
    }

    let lastTransactions: Transaction[] = [];

    return this.http.get(requestURl)
      .map((res: TransactionsResponse) => res.transactions)
      .flatMap((txs: Transaction[]) => {
        lastTransactions = txs;

        const requests = [];

        txs.forEach(transaction => {
          requests.push(this.getDelegateByPublicKey(transaction.senderPublicKey));
        });

        return Observable.forkJoin(requests);
      })
      .map((delegates: Delegate[]) => {
        return delegates.map((res, index) => {
          const tx: Transaction = lastTransactions[index];

          tx.senderDelegate = res;

          return tx;
        });
      })
      .map((txs: Transaction[]) => {
        const pagination = new Pagination(Math.round(offset / limit) + 1);
        pagination.hasPreviousPage = offset >= limit;
        pagination.hasNextPage = txs.length > limit;

        // if we have a next page, we have to remove the last transaction, since we got this only to see if there is a next page
        if (pagination.hasNextPage) {
          txs = txs.slice(0, txs.length - 1);
        }

        return {pagination: pagination, transactions: txs} as PaginatedTransactions;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  };

  // public getLastBlocks(n?: number): Observable<BlocksResponse> {
  public getLastBlocks(offset?: number): Observable<PaginatedBlocks> {
    let lastBlocks: Block[] = [];
    return this.http.get(`${this._network.NODE}/blocks?orderBy=height:desc&limit=20&offset=${offset}`)
      .map((res: BlocksResponse) => res.blocks)
      .flatMap((blocks: Block[]) => {

        lastBlocks = blocks;

        const requests: Observable<Delegate>[] = [];
        blocks.forEach(block => {
          requests.push(this.getDelegateByPublicKey(block.generatorPublicKey));
        });

        return Observable.forkJoin(requests);
      })
      .map((delegates: Delegate[]) => {
        return delegates.map((delegate, index) => {
          const item = lastBlocks[index];
          item.delegate = delegate;

          return item;
        });
      })
      .map((blocks: Block[]) => {
        const height = blocks[0].height;

        const pagination = new Pagination(Math.round(offset / 20) + 1);

        let totalPages = Math.round(height / 20);
        if (totalPages < height / 20) { totalPages++; }

        if (pagination.currentPage < totalPages) {
            pagination.hasPreviousPage = true;
            pagination.previousPage = pagination.currentPage + 1;
        }

        if (pagination.currentPage > 0) {
            pagination.hasNextPage = true;
            pagination.nextPage = pagination.currentPage - 1;
        }

        return {
          blocks: blocks,
          pagination: pagination
        };
      });
  }

  // public getAccount(address: any): Observable<AccountResponse> {
  public getAccount(address: any): Observable<Account> {
    return this.http.get<AccountResponse>(`${this._network.NODE}/accounts?address=${address}`)
      .map((res: AccountResponse) => {
        if (!res.success) {
          throw new Error(res.error);
        }
        return res.account;
      });
  }

  public getTopAccounts(limit: number, offset: number): Observable<AccountsResponse> {
    return this.http.get<AccountsResponse>(`${this._network.NODE}/accounts/top?limit=${limit}&offset=${offset}`);
  }

  public getTransactionsByAddress = (address: string, offset?: number): Observable<PaginatedTransactions> => {
    return this.getLastTransactions({recipientId: address, senderId: address, limit: 30, offset: offset});
  };

  public getSendTransactionsByAddress = (address: any, offset?: number): Observable<PaginatedTransactions> => {
    return this.getLastTransactions({senderId: address, limit: 30, offset: offset});
  };

  public getReceivedTransactionsByAddress = (address: any, offset?: number): Observable<PaginatedTransactions> => {
    return this.getLastTransactions({recipientId: address, limit: 30, offset: offset});
  };

  public getTransaction(id: any): Observable<Transaction> {
    return this.http.get<TransactionResponse>(`${this._network.NODE}/transactions/get?id=${id}`)
      .map((res: TransactionResponse) => {
        if (!res.success) {
          throw new Error(res.error);
        }
        return res.transaction;
      })
      .mergeMap((transaction: Transaction) => {
        return this.getDelegateByPublicKey(transaction.senderPublicKey)
          .map(delegate => {
            transaction.senderDelegate = delegate;
            return transaction;
          });
      });
  }

  public getSendByAddressCount(address: string): Observable<number> {
    return this.http
      .get<TransactionsResponse>(`${this._network.NODE}/transactions?senderId=${address}&limit=1`)
      .map((res: TransactionsResponse) => (res.count));
  }

  public getReceivedByAddressCount(address: string): Observable<number> {
    return this.http
      .get<TransactionsResponse>(`${this._network.NODE}/transactions?recipientId=${address}&limit=1`)
      .map((res: TransactionsResponse) => (res.count));
  }

  // public getBlock(id: any): Observable<BlockResponse> {
  public getBlock(id: string | number): Observable<Block> {
    return this.http.get<BlockResponse>(`${this._network.NODE}/blocks/get?id=${id}`)
      .map((res: BlockResponse) => {
        if (!res.success) {
          throw new Error(res.error);
        }
        return res.block;
      })
      .flatMap((block: Block) => {
        return this.getDelegateByPublicKey(block.generatorPublicKey)
          .map((delegate: Delegate) => {
            block.delegate = delegate;
            return block;
          });
      });
  }

  public getTransactionsByBlock(id: string | number): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this._network.NODE}/transactions?blockId=${id}&limit=50&offset=0`);
  }

  public getDelegateByPublicKey(publicKey: string): Observable<Delegate> {
    return new Observable<Delegate>(observer => {
      ExplorerService._delegates.subscribe((delegates: Delegate[]) => {
        if (Object.keys(delegates).length !== 0) {
          if (delegates.hasOwnProperty(publicKey)) {
            observer.next(delegates[publicKey]);
            observer.complete();
          } else {
            observer.next();
            observer.complete();
          }
        }
      });
    });
  }

  public getDelegateVotes(address: string): Observable<Delegate[]> {
    return this.http.get<DelegatesResponse>(`${this._network.NODE}/accounts/delegates?address=${address}`)
      .map((res: DelegatesResponse) => res.delegates);
  }

  public getDelegateVoters(publickey: string): Observable<Account[]> {
    return this.http.get<AccountsResponse>(`${this._network.NODE}/delegates/voters?publicKey=${publickey}`)
      .map((res: AccountsResponse) => res.accounts);
  }

  // monitor
  public getStandby(): Observable<DelegatesResponse> {
    // return this.http.get(`${CONFIG.API}/delegates/getStandby?n=${n}`)
    return this.http.get<DelegatesResponse>(`${this._network.NODE}/delegates?offset=51`);
  }

  //
  // WEBSOCKET REPLACEMENT - JUST KEEP IT RUNNING!
  //

  public getActiveDelegates(nextForgers: Delegate[], blocks: Block[]): Observable<DelegatesResponse> {
    let totalCount: number = null;
    let activeDelegates: Delegate[] = null;

    return this.http.get<DelegatesResponse>(`${this._network.NODE}/delegates/?orderBy=rate:asc&limit=51`)
      // get forged for each delegate
      .flatMap((res: DelegatesResponse) => {
        totalCount = res.totalCount;
        activeDelegates = res.delegates;

        let requests = this._delegateLastForgedData.data;
        const now = new Date();
        const lastUpdatedDiff = Math.abs(this._delegateLastForgedData.lastUpdated.getTime() - now.getTime());
        if (lastUpdatedDiff > this._updateForgedBlockFreqMS) {
          requests = [];
          activeDelegates.forEach(delegate => {
            requests.push(
              this.http
                .get<ForgingResponse>(`${this._network.NODE}/delegates/forging/getForgedByAccount?generatorPublicKey=${delegate.publicKey}`)
                .map((forgeData: ForgingResponse) => ({delegate: delegate, forgeData: forgeData}))
            );
          });
          this._delegateLastForgedData.lastUpdated = now;
        } else {
          requests = requests.map((response) => {
            if (response.constructor.name !== 'Observable') {
              return Observable.of(response);
            }

            return response;
          });
        }

        return Observable.forkJoin(requests);
      })
      .map((requests: any) => {
        this._delegateLastForgedData.data = requests;
        return requests.map(res => {
          const item = res.delegate;

          item.forged = +res.forgeData.forged;

          return item;
        });
      })
      .flatMap(delegates => {
        let blockData = this._delegateLastBlockData.data;
        const now = new Date();
        const lastUpdatedDiff = Math.abs(this._delegateLastBlockData.lastUpdated.getTime() - now.getTime());
        if (lastUpdatedDiff > this._updateForgedBlockFreqMS) {
          blockData = delegates.map(delegate => {
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
          });
          this._delegateLastBlockData.lastUpdated = now;
        } else {
          blockData = blockData.map((delegate) => {
            if (delegate.constructor.name !== 'Observable') {
              return Observable.of(delegate);
            }

            return delegate;
          });
        }

        return Observable.forkJoin(blockData);
      })
      .map(delegates => {
        this._delegateLastBlockData.data = delegates;
        return {
          delegates: delegates,
          totalCount: totalCount,
        };
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  private getLastBlockByPublicKey(publicKey: string, blocks: Block[]): Observable<Block> {
    const lastBlock = blocks.find(v => (v.generatorPublicKey === publicKey));

    if (lastBlock && lastBlock.hasOwnProperty('timestamp')) {
      return Observable.of(lastBlock);
    } else {
      return this.http
        .get<BlocksResponse>(`${this._network.NODE}/blocks?orderBy=height:desc&limit=1&generatorPublicKey=${publicKey}`)
        .map((res: BlocksResponse) => res.blocks[0]);
    }
  }

  public getForgedByPublicKey(publicKey: string): Observable<string> {
    return this.http
      .get<ForgingResponse>(`${this._network.NODE}/delegates/forging/getForgedByAccount?generatorPublicKey=${publicKey}`)
      .map((res: ForgingResponse) => res.forged);
  }

  public getLatestBlocks(): Observable<Block[]> {
    return this.http.get<BlocksResponse>(`${this._network.NODE}/blocks?orderBy=height:desc&limit=51`)
      .map((res: BlocksResponse) => res.blocks)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public getLastBlock(): Observable<Block> {
    return this.http.get<BlocksResponse>(`${this._network.NODE}/blocks?orderBy=height:desc&limit=1`)
      .map((res: BlocksResponse) => res.blocks[0])
      .flatMap((block: Block) => {
        return this.getDelegateByPublicKey(block.generatorPublicKey)
          .map((res: Delegate) => {
            block.delegate = res;
            return block;
          });
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public getNextForgers(): Observable<Delegate[]> {
    return this.http.get<DelegatesForgersResponse>(`${this._network.NODE}/delegates/getNextForgers?limit=51`)
      .map((res: DelegatesForgersResponse) => res.delegates)
      .flatMap((delegatePublicKeys: string[]) => {
        const requests: Observable<Delegate>[] = [];

        delegatePublicKeys.forEach(publicKey => {
          requests.push(this.getDelegateByPublicKey(publicKey));
        });

        return Observable.forkJoin(requests);
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public getLatestRegistrations(): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this._network.NODE}/transactions/?orderBy=timestamp:desc&limit=5&type=2`)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public getLatestVotes(): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this._network.NODE}/transactions/?orderBy=timestamp:desc&limit=5&type=3`)
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public getDelegatesByPublicKey(): Observable<Delegate[]> {
    return ExplorerService._delegates;
  }

  private _getDelegatesByPublicKey(): Observable<Delegate[]> {
    return this.http.get<DelegatesResponse>(`${this._network.NODE}/delegates?limit=51`)
      .flatMap((res: DelegatesResponse) => {
        const requests: Observable<DelegatesResponse>[] = [];

        for (
          let index = 0;
          index < Math.ceil(res.totalCount / 51);
          index++
        ) {
          requests.push(
            this.http.get<DelegatesResponse>(`${this._network.NODE}/delegates?limit=51&offset=${index * 51}`)
          );
        }

        return Observable.forkJoin(requests);
      })
      .map((requests: DelegatesResponse[]) => {
        return requests.map(res => {
          return res.delegates;
        }).reduce((a, b) => [...a, ...b]);
      })
      .flatMap((delegates: Delegate[]) => {
        const delegateList = {};
        delegates.map((delegate: Delegate) => {
          const delegateObj = new Delegate();
          Object.assign(delegateObj, delegate);
          delegateList[delegate.publicKey] = delegateObj;
        });

        return Observable.of(delegateList);
      })
      .catch((error: any) => Observable.throw(error.error || 'Server error'));
  }

  public searchByAddress(address: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this._network.NODE}/accounts?address=${address}`);
  }

  public searchByDelegateUserName(username: string): Observable<DelegateResponse> {
    return this.http.get<DelegateResponse>(`${this._network.NODE}/delegates/get?username=${username}`);
  }

  public searchByBlockId(blockId: string | number): Observable<BlockResponse> {
    return this.http.get<BlockResponse>(`${this._network.NODE}/blocks/get?id=${blockId}`);
  }

  public searchByTransactionId(id: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this._network.NODE}/transactions/get?id=${id}`);
  }
}
