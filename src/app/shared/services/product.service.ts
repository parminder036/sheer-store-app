import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){
    return this.db.list('/products').snapshotChanges().pipe(
                map(changes => changes.map(c =>
                  ({ key: c.payload.key, ...c.payload.val() as Product })
                  ))
    );
  }
  getProduct(productId){
    return this.db.object('/products/' + productId).snapshotChanges().pipe(
      map(c => ({ key: c.payload.key, ...c.payload.val() as Product })) )
    
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product)
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
