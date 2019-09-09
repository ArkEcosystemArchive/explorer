export interface IBlock {
  id: string;
  height: number;
  timestamp: {
    unix: number;
  };
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
  }
}

export interface ITransaction {
  amount: number;
  price?: number | null;
  timestamp: {
    unix: number;
  };
  vendorField: string;
}

export interface ISortParameters {
  field: string;
  type: string;
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
