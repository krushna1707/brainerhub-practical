import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'pages',
  canActivate: [AuthGuard],
  loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
