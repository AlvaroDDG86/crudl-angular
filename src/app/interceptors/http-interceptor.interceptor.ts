import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,
    private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = (error.error instanceof ErrorEvent) ?
          `Error: ${error.error.message}` :
          `Error Code: ${error.status},  Message: ${error.message}`;
        this.snackbarService.openSnackBar(error.message, 'Error', 'error', 10000, 'top');
        return throwError(errorMsg);
      })
    ).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
  }
}
