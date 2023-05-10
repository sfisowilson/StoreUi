import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ManageProductsService } from '../shared/manage-products.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductImage } from 'src/app/models/ProductImage';
import { CategoriesService } from '../../categories/categories.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-create-or-edit-product',
  templateUrl: './create-or-edit-product.component.html',
  styleUrls: ['./create-or-edit-product.component.scss']
})
export class CreateOrEditProductComponent {
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef<HTMLInputElement>;


  files: any[] = [];
  dropZoneActive = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  UploadImageForm = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isEditable = false;
  product!: any;
  productForm!: FormGroup;
  productId: number = 0;
  isLoadingFiles: boolean = false;
  newFile: any;
  isMainImage: boolean = false;
  images: any;
  mainImage: any;
  categories: Category[] = [];
  selectedCategory!: Category;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _manageProductsService: ManageProductsService,
    private sanitizer: DomSanitizer,
    private _categoriesService: CategoriesService,
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = parseInt(id);
    }
    this.productForm = this._formBuilder.group({
      id: ['0'],
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      sku: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: [''],
      inventoryId: [''],
      discountId: [''],
    });

    this.getProduct(this.productId);
    this.getCategories();
  }

  getProduct(id: number) {
    this._manageProductsService.getProduct(id).subscribe((res: Product) => {
      this.product = res;
      this.productForm.patchValue(this.product);
      this.mainImage = this.getImageUrl(this.product);
      this.images = this.product.productImages;
      if (!this.product.categories) {
        this.product.categories = {name: ''}
      }
  })
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

  onSave() {
    this.save.emit(this.product);
  }

  saveProduct() {

    if (this.productId) {

      this._manageProductsService.updateProduct(this.productForm.value).subscribe((res: number) => {
        console.log(res);
      });

    } else {

      this._manageProductsService.createProduct(this.productForm.value).subscribe((res: number) => {
        this.productId = res;
        this.productForm.patchValue({id: res});
        console.log(res);
      });

    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    //this.addFiles(files);
    this.addFile(event.target.files[0]);
  }


  addFile(file: File) {
  
      const newFile: any = {};
      newFile.file = file;
      this.newFile = newFile;
      this.isLoadingFiles = false;
      console.log(this.newFile);
  }

  uploadFile() {
    if (this.newFile) {
      const formData = new FormData();
  
      formData.append('file', this.newFile.file, this.newFile.name);
      formData.append('isMainImage', this.isMainImage.toString());
      formData.append('productId', this.productId.toString());
  
  
      this._manageProductsService.uploadProductImage(formData).subscribe((res: number) => {
        console.log(res);
        this.getProduct(this.productId);
        this.newFile = null;
      },
      (error : any) => console.error('Upload error:', error)
      );

    }
  }

  getCategories() {
    return this._categoriesService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  selectImage() {
    this.imageInput.nativeElement.click();
  }

  onMainImageChange(file: any) {
    if (file.isMainImage) {
      // Uncheck all other files that were previously marked as main image
      for (let i = 0; i < this.files.length; i++) {
        const otherFile = this.files[i];
        if (otherFile !== file) {
          otherFile.isMainImage = false;
        }
      }
    }
  }

  updateCategory() {
    this.product.categoryId = this.selectedCategory.id;
    
    this._manageProductsService.updateProductCategory(this.product).subscribe((res: number) => {
      console.log(res);
    });
    
  }

  updateInventory() {
    this._manageProductsService.updateInventory(this.product.inventory).subscribe((res: number) => {
      console.log(res);
    },
    (error : any) => console.error('Upload error:', error)
    );

  }

  getFileUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(`url(${URL.createObjectURL(file)})`);
  }
  
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dropZoneActive = false;
  }

  getImage(image: ProductImage) {
    const url = 'url(data:' + image?.imageMimeType + ';base64,' + image?.imageData + ')';
    const res = this.sanitizer.bypassSecurityTrustUrl(url);
    return res;
  }

  onCancel() {
    this.cancel.emit();
  }
}
