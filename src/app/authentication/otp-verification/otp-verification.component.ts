import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service.ts.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Otp } from '../shared/models/authentication.user.ts';
import { response } from 'express';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements OnInit {


  constructor(private otpService:AuthService,private router:Router,private fb:FormBuilder) {}

  otpForm!:FormGroup;



ngOnInit(): void {
  this.otpValidation();
}

otpValidation():void {
  this.otpForm = this.fb.group({
    otp:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
  })
}


otpVerficiation() {
  if(this.otpForm.invalid) {
    return;
  }
const otpPayload = {otp:this.otpForm.value.otp};

this.otpService.otpVerification(otpPayload).subscribe({
  next:(response) => {
    if(response.message === 'OTP verified successfully'){
      console.log(response);
      this.router.navigate(['/signin'])
    } else {
      console.log('Otp is expired')
    }
  } ,error(err) {
      (console.log(err))
  },
})

}

}
