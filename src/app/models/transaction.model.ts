import {Account} from './account.model';
import {OwnerInfo} from './owner-info.model';
import {BaseApiResponse} from './api-response.model';

export class Transaction {
  public amount: number;
  public asset: TransactionAsset;
  public blockid: number;
  public confirmations: number;
  public fee: number;
  public id: string;
  public knownSender: OwnerInfo;
  public recipientId: string;
  public senderDelegate: Account;
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
}
