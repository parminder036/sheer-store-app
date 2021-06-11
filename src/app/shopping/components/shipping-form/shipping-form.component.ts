import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'app/shared/models/order';
import { Shipping } from 'app/shared/models/shipping';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
@Input('cart') cart:ShoppingCart;
userId:string;
userSubscription: Subscription;

shipping:Shipping = {
  name:null,
  addressLine1:null,
  addressLine2:null,
  city: null
};
  constructor(private orderService:OrderService,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.appUser$.subscribe( user =>{
        this.userId = user.uid;
    })
  }

  async placeOrder(){
    let order = new Order(this.userId,this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
