import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service.ts.service';
import { RegisterUser } from '../shared/models/authentication.user.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService,private route:Router,private fb:FormBuilder) {}

  user!:RegisterUser;
  signupForm!:FormGroup;

  ngOnInit(): void {
    this.signupVerify();
  }

  signupVerify() :void {
    this.signupForm = this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(5)]],
      lastName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      phone:['' , [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      password:['' , [Validators.required,Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')]],
      confirmPassword:['',[Validators.required,Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')]]
    })
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
      this.route.navigate(['/otp']);
    }
  })
  }
}
