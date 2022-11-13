import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(new RegExp(/^[^0-9 ]{1}([a-zA-Z ])+[a-zA-Z]+$/))]),
    categoryDesc: new FormControl('', [Validators.required])
  })

  constructor(private categoryService: CategoryService, public dialogRef: MatDialogRef<CategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.data?.id){
      this.categoryForm.patchValue({categoryName:  this.data.name, categoryDesc: this.data.description})
    }
  }

  get pf() {
    return this.categoryForm.controls;
  }

  submit() {
    let categorySubscribe;
    if(this.data?.id){
      categorySubscribe = this.categoryService.update('category/update/' + this.data.id, this.categoryForm.value);
    } else {
      categorySubscribe = this.categoryService.add('category/add', this.categoryForm.value);
    }
    categorySubscribe.subscribe((response) => {
      this.categoryForm.reset()
      this.toastr.success(response.message);
      this.dialogRef.close(response.data)
    });
  }

}
