import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service.js';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Otp } from '../shared/models/authentication.user.ts';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements OnInit {


  constructor(private otpService:AuthService,private router:Router,private fb:FormBuilder,private snackBar:MatSnackBar) {}

  otpForm!:FormGroup;
  isLoading = false;
  resendLoading = false;
  showResendTimer = false;
  resendTimer = 60;
  private timersubscription!:Subscription


ngOnInit(): void {
  this.otpValidation();
}

otpValidation():void {
  this.otpForm = this.fb.group({
    otp:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
  })
}

resendOtp() {

}


otpVerficiation() {
  if(this.otpForm.invalid) {
    return;
  }
  this.isLoading = true;
const otpPayload = {otp:this.otpForm.value.otp};

this.otpService.otpVerification(otpPayload).subscribe({
  next:(response) => {
    this.isLoading = false;
    if(response.message === 'OTP verified successfully'){
      console.log(response);
      this.snackBar.open('User registered succesfully', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top',
      });
      this.router.navigate(['/signin'])
    } else {
      console.log('Otp is expired')
    }
  } ,error:(err) => {
    this.isLoading = false;
    console.log(err)
  },
})

}

}
