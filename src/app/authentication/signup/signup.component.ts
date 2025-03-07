import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';
import { RegisterUser } from '../shared/models/authentication.user.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { passwordValidator } from '../shared/validators/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService,private route:Router,private fb:FormBuilder,private snackBar:MatSnackBar) {}

  user!:RegisterUser;
  signupForm!:FormGroup;

  ngOnInit(): void {
    this.signupVerify();
  }

  onLogin() {
    this.auth.googleLogin();
  }

  signupVerify() :void {
    this.signupForm = this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(1)]],
      email:['',[Validators.required,Validators.email]],
      phone:['' , [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      password:['' , [Validators.required,Validators.minLength(6), passwordValidator()]],
      confirmPassword:['',[Validators.required,Validators.minLength(6), passwordValidator()]]
    })
  }

  success(message: string) {

  }

  onSubmit():void {
    if(this.signupForm.invalid) {
      console.log('Form Data:', this.signupForm.value);
      // return;
    }
    if(this.signupForm.value.password !== this.signupForm.value.confirmPassword){
      throw new Error('password and confirm password must be same')
      // return;
    }
  const user :RegisterUser = this.signupForm.value;

  this.auth.signup(user).subscribe({
    next:(response)=>{
      console.log('User registered successfully', response);
        this.snackBar.open('Otp sent to your email', 'Close', {
          duration: 5000,
          horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.route.navigate(['/otp']);
    }
  })
  }
}
