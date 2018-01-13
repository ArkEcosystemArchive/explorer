export class Pagination {
  public previousPage: number;
  public nextPage: number;
  public hasNextPage: boolean;
  public hasPreviousPage: boolean;

  public constructor(public currentPage: number) {
    this.previousPage = currentPage - 1;
    this.nextPage = currentPage + 1;
  }
}

export interface PaginationResult {
  pagination: Pagination;
}
