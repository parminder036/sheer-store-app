import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { CartService } from 'shared/services/cart.service';
import { AppUser } from 'app/shared/models/app-user';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser:AppUser;
  cart$:Observable<ShoppingCart>

  constructor(private authService:AuthService,
              private cartService:CartService) {}

   async ngOnInit(){
    this.authService.appUser$.subscribe(appUser => {
        this.appUser = appUser
    });
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.authService.logout();
  }
}
