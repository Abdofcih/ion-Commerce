import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginPage } from './pages/login/login.page';
import { ProductsPage } from './pages/products/products.page';
import { OrdersPage } from './pages/orders/orders.page';
import { RouteGuard } from './services/route.guard';
import { AuthVendoreGuard } from './services/auth-vendore.guard';
import { ProductFormPage } from './pages/product-form/product-form.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  { path: 'login', component: LoginPage },

  { path: 'profile', component: ProfilePage ,canActivate:[RouteGuard, AuthVendoreGuard]},
  { path: 'home', component: HomePage ,canActivate:[RouteGuard, AuthVendoreGuard]},
  { path: 'orders', component: OrdersPage ,canActivate:[RouteGuard, AuthVendoreGuard]},
  { path: 'products/new', component:ProductFormPage,canActivate:[RouteGuard, AuthVendoreGuard]},
  { path: 'products/:id', component: ProductFormPage, canActivate: [RouteGuard, AuthVendoreGuard]},
  { path: 'products', component: ProductsPage ,canActivate:[RouteGuard, AuthVendoreGuard]}

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
