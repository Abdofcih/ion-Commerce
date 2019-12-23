import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,OnDestroy {
orders;
getDataSub: Subscription;
changeDataSub: Subscription;
  constructor(private orderService:OrderService) { 
    this.getDataSub = this.orderService.getOrders().snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
   ).subscribe(data=>{
       this.orders = data
       let keysArray = this.orders.map(order => order.key)
       this.orderService.markAsRead(keysArray)
   })
  }

  ngOnInit() {
   
  }
  ngOnDestroy(){
    this.getDataSub.unsubscribe()
  }

}
