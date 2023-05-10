import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from '../shared/manage-products.service';
import { Product } from 'src/app/models/product';
import { ProductsPaginatedFilter } from 'src/app/models/products-paginated-filter';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{
  products: Product[] = [];
  filter: ProductsPaginatedFilter = {sku: '', name: '', page: 1, pageSize: 10};

  displayedColumns: string[] = ['thumbnail', 'name', 'price', 'sku', 'action'];
  dataSource!: MatTableDataSource<Product>;

  constructor(private _manageProductsService: ManageProductsService, private _router: Router, private sanitizer: DomSanitizer,) {
  }

  ngOnInit() {
    this.getProducts();
  }
  
  getProducts() {
    this._manageProductsService.getProducts(this.filter).subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource(data);
    });

  }


  filterProducts() {
    this.filter.page = 1;
    this.getProducts();
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.filter.page = page;
    this.getProducts();
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.filter.pageSize)
  }

  get pages() {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
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

  onAddNewProduct() {
    this._router.navigate(['/dashboard', { outlets: { dashboard: ['create-or-edit-product'] } }]);
  }

  navigateToCreateOrEditProduct(id: number) {
    this._router.navigate(['/dashboard', { outlets: { dashboard: ['create-or-edit-product', id] } }]);
  }
}