import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { LocalStorageService } from './local-storage.service';

describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, LocalStorageService]
    });
  });

  it('should be created', inject([ThemeService], (service: ThemeService) => {
    expect(service).toBeTruthy();
  }));
});
