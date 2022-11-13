import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { CategoryDialogComponent } from '../category/category-dialog/category-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpServices } from '../http.service';
import { SubCategoryDialogComponent } from './sub-category-dialog/sub-category-dialog.component';
import { SubCategoryService } from './sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  pageSize: number = 10;
  currentPage: number = 0;
  totalCount: number = 0;
  categoryColumns: string[] = [
    'categoryId',
    'name',
    'description',
    'createdAt'
  ];
  categoryDataSource = new MatTableDataSource();

  subscriptions: Subscription[] = [];
  isLoading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private httpService: HttpServices,
    public _router: Router,
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAndSetData('sub-category/list?page=1');
  }

  // This function will used to set the url and fetch the data from api
  getAndSetData(url: string): void {
    this.subscriptions.push(
      this.httpService
        .get(url)
        .pipe(distinctUntilChanged())
        .subscribe({
          next: (list: any) => {
            if (list.data) {
              this.categoryDataSource.data = list.data.rows;
              this.totalCount = list.data.totalRows;
              this.paginator.pageSize = list.data.rowPerPage;
              this.paginator.pageIndex = list.data.currentPage - 1;
            }
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        })
    );
  }


  edit(row: any) {
    const subCategoryModel = this.dialog.open(SubCategoryDialogComponent, {
      data: row
    })

    subCategoryModel.afterClosed().subscribe((res) => {
      this.refreshTableData(this.paginator.pageIndex + 1);
    })
  }

  getPaginatorData(page: PageEvent) {
    this.refreshTableData(page.pageIndex + 1)
  }

  refreshTableData(page: number){
    const url: string = `sub-category/list?page=${page}&limit=${this.paginator.pageSize}`;
    this.getAndSetData(url);
  }

  add() {
    const subCategoryModel = this.dialog.open(SubCategoryDialogComponent)

    subCategoryModel.afterClosed().subscribe((res) => {
      this.refreshTableData(1)
    })
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id,  title:  "Delete Sub Category", description: "Are you sure want to delete this Sub Category?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subCategoryService.delete('sub-category/delete/' + result).subscribe((response:any) => {
          this.toastr.success(response.message);
          this.refreshTableData(this.paginator.pageIndex + 1)
        });
      }
    })
  }

}
