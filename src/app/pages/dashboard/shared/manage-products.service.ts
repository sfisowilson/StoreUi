import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/models/Inventory';
import { Product } from 'src/app/models/product';
import { ProductsPaginatedFilter } from 'src/app/models/products-paginated-filter';

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {
  getCategories() {
    throw new Error('Method not implemented.');
  }
  
  private apiUrl = 'https://localhost:7086/api';
  
  constructor(private _http: HttpClient) { }

  getProducts(filter: ProductsPaginatedFilter): Observable<Product[]> {
    const params = new HttpParams()
      .set('name', filter.name)
      .set('sku', filter.sku)
      .set('page', filter.page.toString())
      .set('pageSize', filter.pageSize.toString())

    return this._http.get<Product[]>(`${this.apiUrl}/Product/filtered`, {params});
  }

  uploadProductImage(formData: FormData) {
    return this._http.post<any>(`${this.apiUrl}/Product/product-image`, formData);
  }

  updateProduct(product: Product) {
    return this._http.put<number>(`${this.apiUrl}/Product`, product);
  }

  updateProductCategory(product: Product) {
    console.log(product);
    
    return this._http.put<number>(`${this.apiUrl}/Category/associate-product`, product);
  }

  updateInventory(inventory: Inventory) {
    return this._http.put<number>(`${this.apiUrl}/Product/inventory`, inventory);
  }
  
  
  getProduct(id: number) {
    return this._http.get<Product>(`${this.apiUrl}/Product/${id}`);
  }
  
  createProduct(product: Product) {
    return this._http.post<number>(`${this.apiUrl}/Product`, product);
  }
  
}
