import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../shared/inventory.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  sku = '';
  product?: Product;
  quantityToAdd = 0;
  error = '';

  constructor(private _inventoryService: InventoryService) {}


  onSubmit() {
    this._inventoryService.getBySKU(this.sku).subscribe(res => {
      console.log(res);
      
    })
  }

  searchProduct() {
    console.log(this.sku);
    
    this._inventoryService.getBySKU(this.sku).subscribe(
      (data) => {
        this.product = data;
        this.error = "";
      },
      (error) => {
        this.product = undefined;
        this.error = 'Product not found';
      }
    );
  }

  updateInventory() {
    if (this.product) {
      let inventory = this.product.inventory;
      
      inventory.quantity += this.quantityToAdd;
      this._inventoryService.updateInventory(inventory).subscribe(
        (data) => {
          this.quantityToAdd = 0;
          this.error = '';
        },
        (error) => {
          this.error = 'Error updating product';
        }
      );
    }
  }
}