import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from 'src/app/models/Inventory';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  private apiUrl = 'https://localhost:7086/api';
  
  constructor(private _http: HttpClient) {}
  
  updateInventory(inventory: Inventory) {
    return this._http.put(`${this.apiUrl}/Inventory`, inventory);
  }

  getBySKU(sku: string) {
    return this._http.get<Product>(`${this.apiUrl}/Product/get-by-sku?sku=${sku}`);
  }
}
