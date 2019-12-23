import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }
  getOrders() { 
    return this.db.list('/orders');
  }
markAsRead(keys:Array<string>){
  for(let key of keys)
  this.db.object('/orders/' + key).update({isRead:true});
}
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }
}
