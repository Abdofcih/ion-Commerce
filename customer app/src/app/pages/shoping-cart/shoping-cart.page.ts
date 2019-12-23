import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.page.html',
  styleUrls: ['./shoping-cart.page.scss'],
})
export class ShopingCartPage implements OnInit {
  cart$:Observable<any>;
  items = [];
  userName;
  userId
  constructor( 
                private shoppingCartService: ShoppingCartService,
                public Auth:AuthService,
                private orderService:OrderService,
                private router:Router)
  { 
    Auth.userObs.subscribe(user=>{
       this.userName = user.displayName;
       this.userId = user.uid;
    })
  }

  async ngOnInit() { 
    this.cart$ = await this.shoppingCartService.getCartInit();
    this.cart$.subscribe(data=>{this.items = data.items;})
  }
  clearCart() { 
    this.shoppingCartService.clearCart();
  }
  addOrder(){
    let order = {
      date : new Date().getTime(),
      items:this.items,
      userName:this.userName,
      userId:this.userId,
      isRead:false
    }
    this.orderService.placeOrder(order);
    this.router.navigate(['my-orders'])
  }
}
