import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.development';
import { CheckoutRequest } from '../user/shared/model/CheckoutRequest';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripe = loadStripe(environment.STRIPE_PUBLIC_KEY);
  private Payment_url = environment.COURSE_API
  constructor(private http:HttpClient) { }

  createCheckoutSession(courseData:CheckoutRequest):Observable<{sessionId:string}>{
    return this.http.post<{sessionId:string}>(`${this.Payment_url}payment/create-checkout-session`,courseData,{withCredentials:true})
  }

  async reditrectToCheckout(sessionId:string){
    const stripe = await this.stripe;
    if(stripe) {
      stripe.redirectToCheckout({sessionId})
    }
  }

  verifyPayment(sessionId:string):Observable<{results: {success:boolean,message:string}}>{
    return this.http.post<{results: {success:boolean,message:string}}>(`${this.Payment_url}payment/payment-confirmation/${sessionId}`,{},{withCredentials:true})
  }
}
