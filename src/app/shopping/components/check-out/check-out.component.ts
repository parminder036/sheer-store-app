import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'shared/services/cart.service';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$:Observable<ShoppingCart>
  constructor( private cartService:CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart()
  }

}
