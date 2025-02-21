import { on } from '@ngrx/store';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-dialog.component.ts',
  templateUrl: './error-dialog.component.ts.component.html',
  styleUrl: './error-dialog.component.ts.component.scss'
})
export class ErrorDialogComponent {
  errorCode!:number;
  errorMessage:string = '';
  errorImage:string = '';
  constructor(private router:Router,private activeRoute:ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(params => {
      this.errorCode = +params['code'];
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.errorMessage = params['message'] || 'Soemthing went wrong!';
    })
    this.errorImage = this.getErrorMessage(this.errorCode);
   }


    getErrorMessage(code:number):string {
      switch(code) {
        case 404:
          return 'error/404-error.jpg';
        case 401:
          return 'error/error-401.jpg';
        case 500:
          return 'error/error-500.png';
        default:
          return '';
      }
    }


    goToLogin() {
      this.router.navigate(['/signin']); // Redirects to login page on 401
    }

    goToHome() {
      this.router.navigate(['/home']); // Redirects to login page on 401
    }
}
