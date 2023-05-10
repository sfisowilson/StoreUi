import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() product!: Product;
  
  
}
