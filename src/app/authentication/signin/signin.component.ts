import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.ts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{

  constructor(private route:Router,private auth:AuthService,private fb:FormBuilder) {}

  loginForm!: FormGroup;
  isLoading:boolean = false;
  errorMessage:string = '';
  passwordVisible:boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  onLogin() {
    this.auth.googleLogin();
  }

  showPassword(password:string) {
    this.passwordVisible = !this.passwordVisible;
  }

  onLoginForm() {
    this.isLoading = true;
    if(this.loginForm.invalid) {
      return
    }

    const loginData =this.loginForm.value;

    this.auth.signin(loginData).pipe(
      catchError((error) => {
        this.isLoading = false
        this.errorMessage = error.message;
        return throwError(() => error);
      })
    ).subscribe({
      next:(response) => {
        console.log(response)
        if(response && response.role === 'admin'){
          console.log(response)
          this.isLoading =false;
          this.route.navigate(['/admin-dashboard'])
        } else {
          console.log(response);
          this.route.navigate(['/home'])
        }
        this.loginForm.reset();
      } ,error:(err) => {
        console.log('error in response...',err)
        this.isLoading = false;
      },
    })
  }
}
