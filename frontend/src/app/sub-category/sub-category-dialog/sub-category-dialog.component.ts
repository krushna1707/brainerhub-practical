import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryDialogComponent } from 'src/app/category/category-dialog/category-dialog.component';
import { SubCategoryService } from '../sub-category.service';

@Component({
  selector: 'app-sub-category-dialog',
  templateUrl: './sub-category-dialog.component.html',
  styleUrls: ['./sub-category-dialog.component.scss']
})
export class SubCategoryDialogComponent implements OnInit {
  categoryList: any = [];
  subCategoryForm = new FormGroup({
    categoryId: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    subCategoryName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(new RegExp(/^[^0-9 ]{1}([a-zA-Z ])+[a-zA-Z]+$/))]),
    subCategoryDesc: new FormControl('', [Validators.required])
  })

  constructor(private subCategoryService: SubCategoryService, public dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subCategoryService.categoryList().subscribe((response) =>{
      this.categoryList = response.data.rows;
      if(this.data?.id){
        this.subCategoryForm.patchValue({categoryId: this.data.categoryId, subCategoryName:  this.data.name, subCategoryDesc: this.data.description})
      }
    });
  }

  get pf() {
    return this.subCategoryForm.controls;
  }

  submit() {
    let subCategorySubscribe;
    if(this.data?.id){
      subCategorySubscribe = this.subCategoryService.update('sub-category/update/' + this.data.id, this.subCategoryForm.value);
    } else {
      subCategorySubscribe = this.subCategoryService.add('sub-category/add', this.subCategoryForm.value);
    }
    subCategorySubscribe.subscribe((response) => {
      this.subCategoryForm.reset()
      this.toastr.success(response.message);
      this.dialogRef.close(response.data)
    });
  }

}
