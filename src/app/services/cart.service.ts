import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject;
  itemQuantity: Subject<number> = new Subject;

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === cartItem.id)
    }

    alreadyExistsInCart = ( existingCartItem != undefined)

    if (alreadyExistsInCart){
      existingCartItem?.quantity ? existingCartItem.quantity++ : 0;
    }
    else {
      this.cartItems.push(cartItem);
    }

    this.calculateCartTotals();
  }

  cartDetails(): CartItem[] {
    return this.cartItems;
  }

  calculateCartTotals() {
    let priceTotal: number = 0;
    let quantityTotal: number = 0;

    for (let currentCartItem of this.cartItems) {
      priceTotal += currentCartItem.quantity * currentCartItem.unitPrice;
      quantityTotal += currentCartItem.quantity;
    }

    this.totalPrice.next(priceTotal);
    this.itemQuantity.next(quantityTotal);
  }
}
