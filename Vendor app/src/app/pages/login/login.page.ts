import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(private Auth:AuthService, router: Router) {
    if(Auth.userObs)
    router.navigateByUrl("/home");
   }

  login(){
    this.Auth.login();
  }

}
