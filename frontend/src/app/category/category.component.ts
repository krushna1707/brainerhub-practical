import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { distinctUntilChanged, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServices } from '../http.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CategoryService } from './category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  pageSize: number = 10;
  currentPage: number = 0;
  totalCount: number = 0;
  categoryColumns: string[] = [
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
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAndSetData('category/list?page=1');
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
    const categoryModel = this.dialog.open(CategoryDialogComponent, {
      data: row
    })

    categoryModel.afterClosed().subscribe((res) => {
      this.refreshTableData(this.paginator.pageIndex + 1);
    })
  }

  getPaginatorData(page: PageEvent) {
    this.refreshTableData(page.pageIndex + 1)
  }

  refreshTableData(page: number){
    const url: string = `category/list?page=${page}&limit=${this.paginator.pageSize}`;
    this.getAndSetData(url);
  }

  add() {
    const categoryModel = this.dialog.open(CategoryDialogComponent)

    categoryModel.afterClosed().subscribe((res) => {
      this.refreshTableData(1)
    })
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id,  title:  "Delete Category", description: "Are you sure want to delete this Category?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.delete('category/delete/' + result).subscribe((response:any) => {
          this.toastr.success(response.message);
          this.refreshTableData(this.paginator.pageIndex + 1)
        });
      }
    })
  }
}
