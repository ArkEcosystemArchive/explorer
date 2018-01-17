import {Pagination} from './pagination.model';

export abstract class BaseApiResponse {
  public success: boolean;
  public error?: any;
}

export abstract class BasePaginationApiResponse extends BaseApiResponse {
  public pagination: Pagination;
}
