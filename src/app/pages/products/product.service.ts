import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/product';
import { ProductsPaginatedFilter } from 'src/app/models/products-paginated-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'https://localhost:7086/api';
  
  constructor(private http: HttpClient) {}
  
  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/Category`);
  }

  getProducts(filter: ProductsPaginatedFilter): Observable<Product[]> {
    const params = new HttpParams()
      .set('name', filter.name)
      .set('sku', filter.sku)
      .set('page', filter.page.toString())
      .set('pageSize', filter.pageSize.toString())

    return this.http.get<Product[]>(`${this.apiUrl}/Product/filtered`, {params});
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/Product/${id}`);
  }
}
