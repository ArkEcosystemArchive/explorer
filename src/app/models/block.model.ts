import {Delegate} from './delegate.model';
import {BaseApiResponse, BasePaginationApiResponse} from './api-response.model';

export class Block {
  public confirmations: number;
  public delegate: Delegate;
  public generator: string; // note: some API calls return a generatorId and some a generator
  public generatorId: string; // note: some API calls return a generatorId and some a generator
  public height: number;
  public id: number;
  public previousBlock: string;
  public reward: number;
  public timestamp: number;
  public totalAmount: number;
  public totalFee: number;
  public totalForged: number;
  public transactionsCount: number;
}

export class BlockResponse extends BaseApiResponse {
  public block: Block;
}

export class BlocksResponse extends BasePaginationApiResponse {
  public blocks: Block[];
}
