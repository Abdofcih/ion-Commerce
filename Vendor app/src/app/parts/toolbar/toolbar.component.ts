import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
 @Input() title:string;
  noteficationNum:number ;
  constructor(private orderService:OrderService,public alertController: AlertController) { 
    this.noteficationNum  = parseInt(localStorage.getItem('currentOrderNum'));
    this.noteficationNum =  this.noteficationNum ?  this.noteficationNum : 0;
  }

  ngOnInit() {
        this.orderService.getOrders().valueChanges().subscribe(data=>{
          let count = data.filter((order:Order) =>order.isRead === false).length;
          localStorage.setItem('currentOrderNum',count.toString())
          if(count > this.noteficationNum){
            this.noteficationNum = count
            this.presentAlert()
          }
          this.noteficationNum = count;     
        })

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New Order',
      message: 'you have '+ this.noteficationNum + ' Orders',
      buttons: ['OK']
    });
    await alert.present();
  }

}
