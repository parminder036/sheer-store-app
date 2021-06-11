import { Shipping } from 'shared/models/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';

export class Order{
  userId:string;
  datePlaced:number;
  shipping:Shipping;
  totalPrice:number;
  items:any[]=[];

  constructor( userId:string, shipping:Shipping, cart:ShoppingCart ){
    this.userId= userId;
    this.datePlaced = new Date().getTime();
    this.shipping= shipping;
    this.items = cart.items.map(i =>{
      return {
        product: {
          title:i.title,
          imageUrl:i.imageUrl,
          price:i.price
        },
        quantity:i.quantity,
        totalprice:i.totalPrice
      }
    });

    this.totalPrice= cart.totalPrice;
  }

}