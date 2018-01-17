import {OwnerInfo} from './owner-info.model';
import {BaseApiResponse} from './api-response.model';
import { Pagination, PaginationResult } from './pagination.model';
import { Delegate } from './delegate.model';

export class Transaction {
  public amount: number;
  public asset: TransactionAsset;
  public blockid: number;
  public confirmations: number;
  public fee: number;
  public id: string;
  public knownSender: OwnerInfo;
  public recipientId: string;
  public senderDelegate: Delegate;
  public senderPublicKey: string;
  public senderId: string;
  public timestamp: number;
  public vendorField: string;
}

export class TransactionAsset {
  public delegate: any;
  public signature: string;
  public votes: any;
}

export class TransactionResponse extends BaseApiResponse {
  public transaction: Transaction;
}

export class TransactionsResponse extends BaseApiResponse {
  public transactions: Transaction[];
  public count: number;
}

export interface PaginatedTransactions extends PaginationResult {
  pagination: Pagination;
  transactions: Transaction[];
}

export class TransactionRequestParameters {
  offset?: number;
  limit?: number;
  recipientId?: string;
  senderId?: string;
}
