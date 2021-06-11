import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import '@firebase/auth'
import firebase from 'firebase/app';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$:Observable<firebase.User>

  constructor(private angularFireAuth:AngularFireAuth,
              private route:ActivatedRoute,
              private userService:UserService,
              private router:Router) {
      this.user$ = angularFireAuth.authState;
    }
   

  loginWithGoogle(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    this.router.navigate(['/products']);
  }

  signUp(email, password){
    this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(['/products'])
  }

  signIn(email, password){
    this.angularFireAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/products']);
  }

  logout(){
    this.angularFireAuth.signOut();
    this.router.navigate(['/products']);
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
        if(user) return this.userService.get(user.uid);
  
        return of<AppUser>(null)
      
    }));
  }


}
