import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'shared/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 cart$
  constructor(private cartService:CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    console.log(this.cart$);
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
