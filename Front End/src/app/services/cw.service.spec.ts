import { TestBed, inject } from '@angular/core/testing';

import { CwService } from './cw.service';

describe('CwService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CwService]
    });
  });

  it('should be created', inject([CwService], (service: CwService) => {
    expect(service).toBeTruthy();
  }));
});
