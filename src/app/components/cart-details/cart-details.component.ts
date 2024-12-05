import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0.00;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: CartItem, index: number) {
    item.quantity--;

    if(item.quantity == 0) {
      this.remove(index);
    }
    else {
      this.cartService.calculateCartTotals();
    }
  }

  remove(index: number) {
    this.cartItems.splice(index, 1);
  }

  getCart(): void {
    this.cartItems = this.cartService.cartDetails();
    this.cartService.totalPrice.subscribe(data => this.total = data);
    this.cartService.calculateCartTotals();
  }

}
