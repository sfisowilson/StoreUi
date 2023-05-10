import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from 'src/app/models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private _productService: ProductService, 
    private sanitizer: DomSanitizer,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  
  getProducts() {
    this._productService.getProducts({sku: '', name: '', page: 1, pageSize: 20}).subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Failed to fetch products:', error);
      }
    )
  }

  getCategories() {
    this._productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Failed to fetch Categories:', error);
      }
    )
  }
  
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  getImageUrl(product : Product) {
    let image: any = null;
    if (product.productImages) {
      image = product.productImages.filter(x => x.isMainImage)[0];

    }
    
    const url = 'url(data:' + image?.imageMimeType + ';base64,' + image?.imageData + ')';
    const res = this.sanitizer.bypassSecurityTrustUrl(url);
    return res;
  }

}
