import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)

  return next(req).pipe(
    catchError((error) => {
      if(error.status === 401) {
        console.log('401 Unauthorized: Redirecting to login...');
        handleTokenExpiration(router)
      }
      return throwError(() => error);
    })
  );

};

function handleTokenExpiration(router: Router): void {
  // Clear the token cookie when the token expires
  if(isBrowser()){

    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to the login page
    router.navigate(['/signin']);
  } else {
    console.log('Server-side: Token expired, handle server-side logout');
  }

}


function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
