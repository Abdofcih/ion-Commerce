import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckOutPage } from './check-out.page';

const routes: Routes = [
  {
    path: '',
    component: CheckOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOutPageRoutingModule {}
