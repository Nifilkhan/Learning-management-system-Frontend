import { Otp, RegisterUser } from './../models/authentication.user.ts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(user:RegisterUser):Observable<any> {
    return this.http.post('http://localhost:6001/api/auth/signup',user)
  }

  otpVerification(otpPayload:{otp:number}):Observable<any> {
    return this.http.post('http://localhost:6001/api/auth/verify-otp',otpPayload)
  }
}
