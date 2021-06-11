import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user:firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid:string): Observable<AppUser>{
    return this.db.object('/users/'+ uid).snapshotChanges().pipe(map(user => {
        return { uid: uid, ...user.payload.val() as AppUser}
    }));

  }
}
