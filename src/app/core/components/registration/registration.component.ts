import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private authService:AuthService ) { }

  signUp(form : NgForm){
    this.authService.signUp(form.value.email, form.value.password);
  }

}
