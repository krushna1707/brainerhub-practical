import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.spinner.hide();
                    if (error.error.message === undefined) {
                        error.error.message = 'There might be some issue with server.';
                        this.toastr.info(error.error.message);
                    } else {                       
                        const message = typeof error.error.message == 'string' ? error.error.message : error.error.message[0]
                        this.toastr.error(message);
                        if(error.error.statusCode == 401){
                            this.router.navigate(['/'])
                        }
                    }
                    return throwError(new Error(error.error.message));
                })
            );
    }
}
