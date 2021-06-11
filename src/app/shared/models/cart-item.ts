export class CartItem {
  key:string;
  title:string;
  imageUrl:string;
  quantity:number;
  price:number;

  constructor(init?:Partial<CartItem>){
    Object.assign(this, init);
  }

  get totalPrice(){
    return this.price * this.quantity;
  }

}