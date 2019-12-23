import { TestBed } from '@angular/core/testing';

import { ShopingCartService } from './shopping-cart.service';

describe('ShopingCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopingCartService = TestBed.get(ShopingCartService);
    expect(service).toBeTruthy();
  });
});
