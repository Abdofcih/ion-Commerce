import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

orders = [];
  constructor(private orderService:OrderService,public Auth:AuthService,) { }

  async ngOnInit() {

    this.Auth.userObs.subscribe(user=>{
      this.orderService.getOrdersByUser(user.uid).valueChanges().subscribe(data=>{
       this.orders = data;
       console.log(data);
       
      })
   })
    
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/order-success', JSON.stringify(item)]);
  // }
}
