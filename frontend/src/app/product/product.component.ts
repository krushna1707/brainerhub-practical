import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpServices } from '../http.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  categoryId = 0;
  categoryList: any = [];
  pageSize: number = 10;
  currentPage: number = 0;
  totalCount: number = 0;
  productColumns: string[] = [
    'name',
    'description',
    'createdAt'
  ];
  productDataSource = new MatTableDataSource();
  baseUrl = environment.baseUrl;
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(new RegExp(/^[^0-9 ]{1}([a-zA-Z ])+[a-zA-Z]+$/))]),
    productPrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999.99)]),
    productDesc: new FormControl('', [Validators.required]),
    productImage: new FormControl('', [Validators.required])
  })
  image: any;
  constructor(private productService: ProductService, private dialog: MatDialog, private toastr: ToastrService, private httpService: HttpServices, private spinner: NgxSpinnerService, private subCategoryService: SubCategoryService) { }

  ngOnInit(): void {
    this.subCategoryService.categoryList().subscribe((response) => {
      this.categoryList = response.data.rows;
    });
    this.getAndSetData('product/list?page=1');
  }

  getAndSetData(url: string): void {
    this.spinner.show();
    this.httpService
      .get(url)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (list: any) => {
          if (list.data) {
            this.productDataSource.data = list.data.rows;
            this.totalCount = list.data.totalRows;
            this.paginator.pageSize = list.data.rowPerPage;
            this.paginator.pageIndex = list.data.currentPage - 1;
            this.spinner.hide();
          }
        },
        error: () => {
          this.spinner.hide();
        },
      });
  }

  get pf() {
    return this.productForm.controls;
  }

  edit(row: any) {
    const categoryModel = this.dialog.open(ProductDialogComponent, {
      data: { ...row, categoryList: this.categoryList }
    })

    categoryModel.afterClosed().subscribe((res) => {
      this.refreshTableData(this.paginator.pageIndex + 1);
    })
  }

  getPaginatorData(page: PageEvent) {
    this.refreshTableData(page.pageIndex + 1)
  }

  refreshTableData(page: number) {
    const url: string = `product/list?page=${page}&limit=${this.paginator.pageSize}&categoryId=${this.categoryId}`;
    this.getAndSetData(url);
  }

  add() {
    const productModel = this.dialog.open(ProductDialogComponent, { data: { categoryList: this.categoryList } })

    productModel.afterClosed().subscribe((res) => {
      this.refreshTableData(1)
    })
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, title: "Delete Product", description: "Are you sure want to delete this Product?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.productService.delete('product/delete/' + result).subscribe((response: any) => {
          this.toastr.success(response.message);
          this.refreshTableData(this.paginator.pageIndex + 1)
        });
      }
    })
  }

  categoryChange(){
    this.refreshTableData(1)
  }


}
