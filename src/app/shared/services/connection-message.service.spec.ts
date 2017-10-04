import { TestBed, inject } from '@angular/core/testing';

import { ConnectionMessageService } from './connection-message.service';

describe('ConnectionMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionMessageService]
    });
  });

  it('should be created', inject([ConnectionMessageService], (service: ConnectionMessageService) => {
    expect(service).toBeTruthy();
  }));
});
