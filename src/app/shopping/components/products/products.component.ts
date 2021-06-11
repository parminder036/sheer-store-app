import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { switchMap } from 'rxjs/operators'
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { CartService } from 'shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:Product[]=[];
  filteredProducts:Product[];
  category:string;
  cart$:Observable<ShoppingCart>

  constructor( private route:ActivatedRoute,
               private productService:ProductService,
              private cartService:CartService) {}

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
    }           

   populateProducts()  { 
    this.productService.
      getAllProducts().
      pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParams})).
      subscribe(params => {
        this.category = params['category']
        this.applyFilter();
        
     })}
     
     applyFilter(){
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category): 
     this.products;
  
     }
     
    }
  
  
    


