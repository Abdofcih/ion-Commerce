import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { ShopingCartPage } from './pages/shoping-cart/shoping-cart.page';
import { CheckOutPage } from './pages/check-out/check-out.page';
import { OrderSuccessPage } from './pages/order-success/order-success.page';
import { MyOrdersPage } from './pages/my-orders/my-orders.page';
import { LoginPage } from './pages/login/login.page';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },

  { path: 'shoping-cart', component: ShopingCartPage },
  {  path: 'profile', component: ProfilePage,  canActivate:[RouteGuard] },
  { path: 'check-out', component: CheckOutPage, canActivate:[RouteGuard] },
  { path: 'order-success', component: OrderSuccessPage,  canActivate:[RouteGuard] },
  { path: 'my-orders', component: MyOrdersPage, canActivate:[RouteGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
