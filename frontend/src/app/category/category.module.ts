import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../http-error.interceptor';
import { CategoryRoutingModule } from './category-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ],
  providers:[CategoryService],
  exports:[CategoryComponent],
  entryComponents: [CategoryDialogComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryModule { }
