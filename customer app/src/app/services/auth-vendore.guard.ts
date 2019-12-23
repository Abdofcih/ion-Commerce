import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthVendoreGuard implements CanActivate  {
  constructor( public Auth:AuthService,private userService: UserService ){}
  canActivate():Observable<boolean> {
     return this.Auth.userObs.pipe(
       switchMap((user)=> this.userService.get(user.uid)),
       map((user:User) => user.isVendor )
     )
     
  }
  /*
canActivate(): Observable<boolean> {
  return this.auth.user$.pipe(
    switchMap(({uid})=> this.userService.get(uid)),
    map(user => something with user which returns a boolean)
    );
  }
  */
}
