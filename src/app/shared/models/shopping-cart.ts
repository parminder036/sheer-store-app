import { CartItem } from 'shared/models/cart-item';

export class ShoppingCart{
  items: CartItem[] =[];

  constructor( private itemsMap?: { [productId : string]: CartItem}){
    this.itemsMap = itemsMap || {};
    console.log(this.itemsMap)

    for(let productId in itemsMap){
      let item = itemsMap[productId];
      this.items.push(new CartItem({...item , key:productId}));
    }
    console.log(this.items)
  }

  getQuantity(product){
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0 ;
  }

  get totalPrice(){
    let sum = 0;
    for(let productId in this.items)
      sum += this.items[productId].totalPrice;
      return sum;
    
  }

  get totalItemsCount(){
    let count = 0;
    for(let productId in this.items)
      count += this.items[productId].quantity;
      return count;
    }
  }
