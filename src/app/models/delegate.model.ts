import {BaseApiResponse} from './api-response.model';

export class Delegate {
  public username: string;
  public address: string;
  public publicKey: string;
  public productivity: number;
  public rate: number;
  public approval: number;
  public forged: string;
  public producedblocks: number;
  public missedblocks: number;
}

export class DelegateResponse extends BaseApiResponse {
  public delegate: Delegate;
}

export class DelegatesResponse extends BaseApiResponse {
  public delegates: Delegate[];
  public totalCount: number;
}

export class ForgingResponse extends BaseApiResponse {
  public fees: string;
  public forged: string;
  public rewards: string;
}

export class DelegatesForgersResponse extends BaseApiResponse {
  public currentBlock: number;
  public currentSlot: number;

  // note: contains only public keys!
  public delegates: string[];
}
