import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  standalone: false,
  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  products: Product[] = [];
  @Input() value = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  searchProducts(value: string) {
    console.log(`value=${value}`)
    this.router.navigateByUrl(`/search/${value}`)
  }

}
