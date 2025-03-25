import {  Login, LoginResponse, RegisterUser} from '../authentication/shared/models/authentication.user.ts.js' ;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { UserData } from '../user/shared/model/user-data.js';
import { environment } from '../../environments/environment.development.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private GOOGLE_URL = environment.GOOGLE_CALLBACK_URL;
  private AUTH_URL = environment.COURSE_API

  signup(user:RegisterUser):Observable<any> {
    return this.http.post(`${this.AUTH_URL}auth/signup`,user)
  }

  otpVerification(otpPayload:{otp:number}):Observable<any> {
    return this.http.post(`${this.AUTH_URL}auth/verify-otp`,otpPayload)
  }

  signin(data:Login):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.AUTH_URL}auth/signin`,data,{withCredentials:true})
  }

  logogut():Observable<any> {
    return this.http.post(`${this.AUTH_URL}auth/logout`,{})
  }

  getUsers():Observable<{users:RegisterUser[]}> {
    return this.http.get<{users:RegisterUser[]}>(`${this.AUTH_URL}auth/get-verified-users`)
  }

  getLoggedInUser():Observable<{user:UserData}>{
    return this.http.get<{user:UserData}>(`${this.AUTH_URL}auth/user`,{ withCredentials: true })
}

googleLogin() {
  window.location.href = `${this.GOOGLE_URL}google`
}

isAuthenticated():Observable<boolean>{
  return this.http.get<boolean>(`${this.GOOGLE_URL}verify-session`,{withCredentials:true})
}
}
