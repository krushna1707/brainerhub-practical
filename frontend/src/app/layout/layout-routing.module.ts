import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
        path: 'product',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'category',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'sub-category',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../sub-category/sub-category.module').then(m => m.SubCategoryModule)
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
