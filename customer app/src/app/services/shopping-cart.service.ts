import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }

  // async getCart()  : Promise<Observable<ShoppingCart>>
  async getCartInit() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe( map((x:ShoppingCart) => new ShoppingCart(x.items)))
     
  }
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
     
  }

  async addToCart(product: Product) { 
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').set(false);
  }
  

  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      items:false
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    let updated = true;
    item$.valueChanges().subscribe((item:Product) => {
      if(updated){
          let quantity = 1;
          if(item)
          quantity = item.quantity  + change;
     
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        cat:product.cat,
        description:product.description,
        imgUrl: product.imgUrl,
        price: product.price,
        quantity: quantity
      });
     }
      updated = false;
    });
  }
  
}
