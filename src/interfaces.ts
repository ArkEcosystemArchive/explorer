export interface IBlock {
  id: string;
  height: number;
  timestamp: {
    unix: number;
  };
  transactions: [ITransaction];
}

export interface IDelegate {
  address: string;
  username: string;
  publicKey: string;
}

export interface ITransaction {
  amount: number;
}

export interface ISortParameters {
  field: string;
  type: string;
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
