import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-checkout',
  standalone: false,
  
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;
  cartItems: CartItem[] = [];
  total: number = 0.00;
  quantity: number = 0;

  constructor(private formBuilder: FormBuilder, private cartService: CartService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shipping: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      billing: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      payment: this.formBuilder.group({
        type: [''],
        name: [''],
        number: [''],
        cvv: [''],
        month: [''],
        year: ['']
      })
    });

    this.getCart();
  }

  copyShipping(event: any) {
    if(event.target.checked){
      this.checkoutFormGroup.controls['billing']
      .setValue(this.checkoutFormGroup.controls['shipping'].value)
    }
    else {
      this.checkoutFormGroup.controls['billing'].reset();
    }
  }

  getCart(): void {
    this.cartItems = this.cartService.cartDetails();
    this.cartService.totalPrice.subscribe(data => this.total = data);
    this.cartService.totalQuantity.subscribe(data => this.quantity = data);
    this.cartService.calculateCartTotals();
  }

  onSubmit() {
    console.log('submit handler start')
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }
}
