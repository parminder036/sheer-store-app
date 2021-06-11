import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private db:AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(
      map((action:any) => {
        if(!action) return new ShoppingCart();
        return new ShoppingCart(action.items);
      }));
    }

  addToCart(product:Product){
    this.updateItem(product , 1)
  }

  removeFromCart(product:Product){
    this.updateItem(product , -1);
  }

  async clearCart(){
    let cartId =  await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items/').remove();
  }

  getItem(cartId:string, productId:string ){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key)
    return result.key;
  }

  async updateItem(product:Product , change:number ){
    let cartId = await this.getOrCreateCartId();
    let item$=  this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item:any) => {
      const itemValue = item.payload.val();
      const quantity = (itemValue ? itemValue.quantity : 0) + change;

      if (quantity === 0)
        item$.remove();
      else{
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
  });
} 

}