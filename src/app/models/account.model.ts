import {Delegate} from './delegate.model';
import {BaseApiResponse} from './api-response.model';

export class Account {
  public address: string;
  public balance: number;
  public delegate: Delegate;
  public incoming_cnt: number;
  public outgoing_cnt: number;
  public publicKey: string;
  public username: string;
  public voters: Account[];
  public votes: Delegate[];
}

export class AccountResponse extends BaseApiResponse {
  public account: Account;
}

export class AccountsResponse extends BaseApiResponse {
  public accounts: Account[];
}
