import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HttpServices } from './http.service';
import { CategoryModule } from './category/category.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    CategoryModule,
    SubCategoryModule,
    HttpClientModule,
    LayoutModule,
    ProductModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    }),
    NgxSpinnerModule,
  ],
  providers: [HttpServices, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }, AuthService, AuthGuard],
  entryComponents:[DeleteDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
