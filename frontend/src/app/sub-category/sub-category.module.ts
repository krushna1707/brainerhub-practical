import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryDialogComponent } from './sub-category-dialog/sub-category-dialog.component';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    SubCategoryComponent,
    SubCategoryDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    SubCategoryRoutingModule
  ]
})
export class SubCategoryModule { }
