import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog.component.ts/error-dialog.component.ts.component';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  return next(req).pipe(
    catchError((error:HttpErrorResponse):Observable<never> => {
      let errorMessage = 'An unknown error occurred!';
      let errorCode:number = 500;

      if(error.error instanceof ErrorEvent){
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
              errorMessage = 'Email or password is not correct'
              errorCode = 401;
            return throwError(() => new Error(error.error.message || 'Invalid credentials')); // ✅ Pass backend error message
          case 404:
            errorMessage = 'Resource not found.';
            errorCode = 404;
            break;
          case 500:
            errorMessage = 'Internal server error. Try again later.';
            errorCode = 500;
            break;
        }
      }

         // Redirect user to the error page with query params for the message
         router.navigate([`/error/${errorCode}`], { queryParams: { message: errorMessage } });

      return throwError(() => new Error(errorMessage));
    })
  );
};
