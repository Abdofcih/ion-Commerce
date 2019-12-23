import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject  } from '@angular/fire/database';
import * as firebase from 'firebase';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      isVendor: true
    });
  }

  get(uid: string){
    return this.db.object('/users/' + uid).valueChanges() ;
  }
}
