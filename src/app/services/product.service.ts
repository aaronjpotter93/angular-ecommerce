import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  constructor(private htttpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.htttpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
