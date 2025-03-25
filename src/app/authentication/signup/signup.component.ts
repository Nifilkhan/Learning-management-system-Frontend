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
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService,private route:Router,private fb:FormBuilder,private snackBar:MatSnackBar) {}

  user!:RegisterUser;
  signupForm!:FormGroup;
  password:boolean = false;
  confirmPassword:boolean = false;
  errorMessage:string=''

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
    },{validators:this.passwordMatchValidator})
  }

  success(message: string) {

  }


  showPassword(field:string) {
    if(field === 'password') {
      this.password = !this.password;
    } else if(field === 'confirmPassword') {
      this.confirmPassword = !this.confirmPassword;
    }
  }

  onSubmit():void {
    if(this.signupForm.valid) {
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
        this.signupForm.reset();
    },error:(err) => {
      if(err.error.message.includes('Email already registered')) {
        this.errorMessage = 'Email is already registered. Please use a different email.';
      } else{
        this.errorMessage = err.error.message || 'An error occurred during signup';
      }
      this.errorMessage = err.message
    },
  })
  }else {
    this.errorMessage = 'Please fill out the form correctly';
  }
  }

  passwordMatchValidator(form:FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if(password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({mismatch:true});
    } else{
      confirmPassword?.setErrors(null);
    }
  }
}
