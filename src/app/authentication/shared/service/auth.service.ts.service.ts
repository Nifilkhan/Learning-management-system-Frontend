import { Login, LoginResponse, Otp, RegisterUser } from './../models/authentication.user.ts';
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

  signin(data:Login):Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:6001/api/auth/signin',data,{withCredentials:true})
  }

  logogut():Observable<any> {
    return this.http.post('http://localhost:6001/api/auth/logout',{})
  }

  getUsers():Observable<{users:RegisterUser[]}> {
    return this.http.get<{users:RegisterUser[]}>('http://localhost:6001/api/auth/get-verified-users')
  }

  getLoggedInUser():Observable<any> {
    return this.http.get('http://localhost:6001/api/auth/user',{ withCredentials: true })
  }
}
