import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { ShopFormService } from '../../services/shop-form.service';

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

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private shopFormSvice: ShopFormService) {}

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

    const startMonth: number = new Date().getMonth() + 1;
    this.shopFormSvice.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.shopFormSvice.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
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
    this.cartService.totalPrice.subscribe(data => this.total = data);
    this.cartService.totalQuantity.subscribe(data => this.quantity = data);
  }

  onSubmit() {
    console.log('submit handler start')
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('payment');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.year);

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.shopFormSvice.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }
}
