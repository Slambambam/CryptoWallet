import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuestGuard } from './admin-guest.guard';

describe('AdminGuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuestGuard]
    });
  });

  it('should ...', inject([AdminGuestGuard], (guard: AdminGuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
