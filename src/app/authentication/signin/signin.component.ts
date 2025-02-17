import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.ts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/validators/validators';


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

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  onLogin() {
    this.auth.googleLogin();
  }

  onLoginForm() {
    this.isLoading = true;
    if(this.loginForm.invalid) {
      return
    }

    const loginData =this.loginForm.value;

    this.auth.signin(loginData).subscribe({
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
      } ,error:(err) => {
        this.isLoading = false;
          if(err.status === 403) {
            this.errorMessage = 'This email is registered via Google OAuth. Please log in with Google.'
          } else {
            this.errorMessage = err.error.message;
          }
      },
    })
  }
}
