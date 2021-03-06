import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    CheckOutComponent,
    ShippingFormComponent,
    CartSummaryComponent
  ],
  imports: [
    ShoppingRoutingModule,
    SharedModule,
  ]
})
export class ShoppingModule { }
