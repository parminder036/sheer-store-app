import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
 Order$
 name:string;
  constructor(private authService:AuthService,
              private orderService:OrderService) { }

    ngOnInit() {
    this.Order$=  this.authService.appUser$.
          pipe(switchMap(user => {
             return this.orderService.getOrdersByUser(user.uid)
    }));
  }

}
