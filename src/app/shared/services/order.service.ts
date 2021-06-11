import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './cart.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private db:AngularFireDatabase,
               private cartservice:CartService) { }

  async placeOrder(order:Order){
    let result = await this.db.list('/orders').push(order);
    this.cartservice.clearCart();
    return result;
  }

  getOrdersByUser(userId:string):Observable<Order[]>{
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).
        snapshotChanges().pipe(map(changes => changes.map(c =>{
        return ({ key: c.payload.key, ...c.payload.val() as Order })
        }
         )))
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(data => {
      return data.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as Order};
        return data;
      });
    }));
  }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  deleteOrder(id: string) {
    return this.db.list('/orders/' + id).remove();
  }

}
