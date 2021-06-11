import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode= true;

  constructor(private authService:AuthService) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  logIn(form : NgForm){
    this.authService.signIn(form.value.email, form.value.password);
  }

}
