import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
 @Input() title:string;
 cart$:Observable<any>;
 shopingCartCount:number;
  constructor( private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() { 
    this.cart$ = await this.shoppingCartService.getCartInit();
    // this.cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    // this.cart$.subscribe(cart=>{
    //   this.shopingCartCount = 0;
    //   for(let productId in cart.items){
    //     this.shopingCartCount += cart.items[productId].quantity
    //   }
    // })
  }

}
