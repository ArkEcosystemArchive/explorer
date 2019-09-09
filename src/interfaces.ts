export interface IBlock {
  id: string;
  height: number;
  timestamp: ITimestamp;
  transactions: [ITransaction];
  price?: number | null;
}

export interface IDelegate {
  address: string;
  username: string;
  publicKey: string;
  blocks: {
    produced: number;
    last: IBlock;
  };
  votes: string;
  rank: number;
  production: {
    approval: number;
  };
  forged: {
    fees: string;
    rewards: string;
    total: string;
  };
}

export interface IMeta {
  count: number;
  pageCount: number;
  totalCount: number;
  next: string;
  previous: string;
  self: string;
  first: string;
  last: string;
}

export interface ITransaction {
  amount: string;
  price?: number | null;
  timestamp: ITimestamp;
  vendorField: string;
  fee: string;
}

export interface ISortParameters {
  field: string;
  type: string;
}

export interface ITimestamp {
  unix: number;
  epoch: number;
  human: string;
}

export interface IWallet {
  address: string;
}

export interface IApiResponse {
  error?: string;
  statusCode?: string;
  meta?: any;
  data?: IApiResponseData;
}

export interface IApiResponseData {
  data: [any];
}
