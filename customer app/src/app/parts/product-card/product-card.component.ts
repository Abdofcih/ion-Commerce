import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
@Input() product:Product;
@Input('shopping-cart') shoppingCart: ShoppingCart; 
constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {}
  addToShopingCart(){
    this.cartService.addToCart(this.product);
  }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item? item.quantity : 0;
  }

}
