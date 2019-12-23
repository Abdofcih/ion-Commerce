import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from './../models/user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObs: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute) { 
      this.userObs = this.afAuth.authState;
    }
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() { 
    this.afAuth.auth.signOut();
  }
  get appUserObs(): Observable<User>{
    return this.userObs.pipe(switchMap(user =>{return this.userService.get(user.uid) as Observable<User>}))
  }
  /*
  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }
  */
}
