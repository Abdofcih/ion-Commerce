import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToolbarComponent } from 'src/app/parts/toolbar/toolbar.component';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ShopingCartPage } from './pages/shoping-cart/shoping-cart.page';
import { CheckOutPage } from './pages/check-out/check-out.page';
import { OrderSuccessPage } from './pages/order-success/order-success.page';
import { MyOrdersPage } from './pages/my-orders/my-orders.page';
import { LoginPage } from './pages/login/login.page';
import { ProductCardComponent } from './parts/product-card/product-card.component';
import { ProductQuantityComponent } from './parts/product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ProfilePage,
    ShopingCartPage,
    CheckOutPage,
    OrderSuccessPage,
    MyOrdersPage,
    LoginPage,
    ToolbarComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
