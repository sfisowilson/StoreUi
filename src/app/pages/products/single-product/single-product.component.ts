import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductImage } from 'src/app/models/ProductImage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent  implements OnInit{

  quantity = 1;
  maxQuantity = 0;
  product!: Product;
  productId!: number;
  currentImage!: SafeUrl;
  productImages!: ProductImage[];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _productService: ProductService, 
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productId = parseInt(productId);
    }
    this.getProduct(this.productId);
  }

  getProduct(id : number) {
    this._productService.getProduct(id).subscribe(
      (product: Product) => {
        this.product = product;
        this.maxQuantity = (product?.inventory?.quantity) ? product?.inventory?.quantity : 0;
        this.currentImage = this.getImageUrl(product);
        this.productImages = product.productImages;
      },
      (error: any) => {
        console.error('Failed to fetch products:', error);
      }
    )
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
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

  getImage(image: ProductImage) {
    const url = 'url(data:' + image?.imageMimeType + ';base64,' + image?.imageData + ')';
    const res = this.sanitizer.bypassSecurityTrustUrl(url);
    return res;
  }

  changeSelectedImage(image: ProductImage) {
    const currentImageIndex = this.productImages.findIndex(x => x.isMainImage);
    const index = this.productImages.findIndex(x => x.id === image.id);
    this.productImages[currentImageIndex].isMainImage = false;
    this.productImages[index].isMainImage = true;
    this.currentImage = this.getImage(this.productImages[index]);
  }
}
