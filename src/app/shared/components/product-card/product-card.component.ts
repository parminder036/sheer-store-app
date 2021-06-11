import { Component, Input } from '@angular/core';
import { CartService } from 'shared/services/cart.service';
import { Product } from 'app/shared/models/product';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product
  @Input ('shopping-Cart') shoppingCart:ShoppingCart

  constructor(private cartService:CartService) { }
  
  addToCart(){
    this.cartService.addToCart(this.product);
  }
}
