import { TestBed, inject } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService]
    });
  });

  it('should be created', inject([CurrencyService], (service: CurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
