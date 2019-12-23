import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopingCartPage } from './shoping-cart.page';

describe('ShopingCartPage', () => {
  let component: ShopingCartPage;
  let fixture: ComponentFixture<ShopingCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
