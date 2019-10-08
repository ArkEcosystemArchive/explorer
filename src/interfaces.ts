import { ForgingStatus } from "./enums";

export interface IBlock {
  id: string;
  version: number;
  height: number;
  previous: string;
  forged: {
    reward: string;
    fee: string;
    total: string;
    amount: string;
  };
  payload: {
    hash: string;
    length: number;
  };
  generator: {
    username: string;
    address: string;
    publicKey: string;
  };
  signature: string;
  confirmations: number;
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
  forgingStatus: ForgingStatus;
}

export interface IRoundDelegate {
  publicKey: string;
  votes: string;
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
  id: string;
  blockId: string;
  version?: number;
  type: number;
  typeGroup: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  vendorField: string;
  confirmations: number;
  timestamp: ITimestamp;
  asset?: any;
  signatures?: string[];
  price?: number | null;
  nonce?: string;
  lockStatus?: number;
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
  username: string;
  publicKey: string;
  vote: string;
  isDelegate: boolean;
  isResigned?: boolean;
  lockedBalance?: string;
}

export interface IApiResponse {
  error?: string;
  statusCode?: string;
  meta?: IMeta;
  data?: any[] | any;
}

export interface IApiBlockWrapper {
  data: IBlock;
}

export interface IApiBlocksWrapper {
  data: IBlock[];
  meta: IMeta;
}

export interface IApiDelegateWrapper {
  data: IDelegate;
}

export interface IApiDelegatesWrapper {
  data: IDelegate[];
  meta: IMeta;
}

export interface IApiRoundDelegatesWrapper {
  data: IRoundDelegate[];
}

export interface IApiBlockchainWrapper {
  data: IBlockchain;
}

export interface IBlockchain {
  block: {
    height: number;
    id: string;
  };
  supply: string;
}

export interface IApiDelegateVotersWrapper {
  data: ISimpleWallet[];
  meta: IMeta;
}

export interface IApiTransactionWrapper {
  data: ITransaction;
}

export interface IApiTransactionsWrapper {
  data: ITransaction[];
  meta: IMeta;
}

export interface ISimpleWallet {
  address: string;
  publicKey: string;
  secondPublicKey?: string;
  balance: string;
  isDelegate: boolean;
  vote: string;
}

export interface IApiNodeConfiguration {
  [key: string]: any;
}

export interface IApiNodeStatus {
  synced: boolean;
  now: number;
  blockCount: number;
  timestamp: number;
}

export interface ICurrencyState {
  name: string;
  rate: number;
  symbol: string;
  lastConversion: {
    to: string;
    timestamp: number;
    rate: number;
  };
}

export interface IDelegateState {
  delegates: string | null;
  forged: any[];
}

export interface INetworkState {
  defaults: {};
  server: string | null;
  nethash: string | null;
  alias: string | null;
  addressPrefix: number;
  activeDelegates: number;
  rewardOffset: number;
  token: string | null;
  symbol: string | null;
  currencies: any[];
  knownWallets: any[];
  supply: number;
  height: number;
  epoch: string | null;
  blocktime: number;
}

export interface IUiState {
  language: string;
  locale: string;
  nightMode: boolean;
  priceChartOptions: {
    enabled: boolean;
    period: string;
    type: string;
  };
  headerType: string | null;
  menuVisible: boolean;
  blockSortParams: string | null;
  delegateSortParams: string | null;
  transactionSortParams: string | null;
  walletSortParams: string | null;
}

export interface IStorePayload {
  type: string;
  value: any;
}

export interface IVTooltip {
  content: any;
  trigger?: string;
  show?: boolean;
  hideOnTargetClick?: boolean;
  delay?: any;
  classes?: string;
}

export interface ITransactionType {
  key: string;
  type: number;
  typeGroup?: number;
}
