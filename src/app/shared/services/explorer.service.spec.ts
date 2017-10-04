import { TestBed, inject } from '@angular/core/testing';

import { ExplorerService } from './explorer.service';

describe('ExplorerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExplorerService]
    });
  });

  it('should be created', inject([ExplorerService], (service: ExplorerService) => {
    expect(service).toBeTruthy();
  }));
});
