import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public profilePage =  {
    url: '/profile',
    icon: 'person'
  }

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Orders',
      url: '/my-orders',
      icon: 'list'
    },
    {
      title: 'Shoping Cart',
      url: '/shoping-cart',
      icon: 'cart'
    }
  ];
  appUser: User;
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      public Auth:AuthService,
      private  router: Router,
      private userService:UserService,
      private productService:ProductService,
      public alertController: AlertController) {
      this.initializeApp();
      Auth.userObs.subscribe(user => {
        if (user) {
          localStorage.setItem('loggedUserId',user.uid)
          this.userService.get(user.uid).subscribe((data:User)=>{
            if(!data.address)
            this.presentAlertPrompt(user)
          })
          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      });

  }
  logout(){
    this.Auth.logout()
  }

  filterCategory(){
    this.productService.filterCategory = "headphone";
  }

  async presentAlertPrompt(user) {
    const alert = await this.alertController.create({
      header: 'Required Data',
      inputs: [
        {
          name: 'address',
          type: 'text',
          placeholder: 'Type your address',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Type new password',
        }
      ],
      buttons: [
         {
          cssClass: 'secondary',
          text: 'Ok',
          handler: (alertData) => {
            if(!alertData.address && !alertData.password)  {
              
            }
            console.log('Confirm Ok',alertData.address);
            this.userService.save(user,alertData.password,alertData.address);
          }
        }
      ]
    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
