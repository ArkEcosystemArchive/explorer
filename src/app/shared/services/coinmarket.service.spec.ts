import { TestBed, inject } from '@angular/core/testing';

import { CoinmarketService } from './coinmarket.service';

describe('CoinmarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinmarketService]
    });
  });

  it('should be created', inject([CoinmarketService], (service: CoinmarketService) => {
    expect(service).toBeTruthy();
  }));
});
