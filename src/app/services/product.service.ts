import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductListPaginate(number: number,
                         size: number,
                         theCategoryId: number): Observable<GetResponseProducts> {
      const pageUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${number}&size=${size}`;

      return this.httpClient.get<GetResponseProducts>(pageUrl);
  }

  getProductCategories() {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProductsPaginate(name: string,
                         number: number,
                         size: number
                         
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}&page=${number}&size=${size}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  findProductById(id: number) {
    const productUrl = `${this.baseUrl}/${id}`

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
    }
}

interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
