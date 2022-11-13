import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { SubCategoryService } from 'src/app/sub-category/sub-category.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  image: any;
  categoryList: any = [];
  productForm = new FormGroup({
    categoryIds: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    productPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999.99)]),
    productDesc: new FormControl('', [Validators.required]),
    productImage: new FormControl('')
  })
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private toastr: ToastrService, private subCategoryService: SubCategoryService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.data?.id) {
      this.spinner.show();
      this.productService.get('product/category/' + this.data.id).subscribe((productCategoryResponse) => {
        this.spinner.hide();
        this.productForm.patchValue({ categoryIds: productCategoryResponse.data.map((d: any) => d.categoryId), productPrice: this.data.price, productName: this.data.name, productDesc: this.data.description })
      });
    } else {
      this.productForm.controls["productImage"].setValidators([Validators.required]);
    }
  }

  get pf() {
    return this.productForm.controls;
  }

  updateFile(e: any) {
    this.image = e.target.files[0]
  }

  submit() {
    this.spinner.show();
    let form = new FormData()
    form.append('productName', this.productForm.value.productName);
    form.append('productPrice', this.productForm.value.productPrice);
    form.append('productDesc', this.productForm.value.productDesc);
    form.append('productImage', this.image);
    form.append('categoryIds', this.productForm.value.categoryIds);
    let productSubscribe;
    if (this.data?.id) {
      productSubscribe = this.productService.update('product/update/' + this.data.id, form);
    } else {
      productSubscribe = this.productService.add('product/add', form);
    }
    productSubscribe.subscribe((response) => {
      this.productForm.reset()
      this.toastr.success(response.message);
      this.spinner.hide();
      this.dialogRef.close(response.data)
    });

  }

}
