import { TestBed, async, inject } from '@angular/core/testing';

import { AuthVendoreGuard } from './auth-vendore.guard';

describe('AuthVendoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthVendoreGuard]
    });
  });

  it('should ...', inject([AuthVendoreGuard], (guard: AuthVendoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
