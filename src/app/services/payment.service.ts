import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripe = loadStripe(environment.STRIPE_PUBLIC_KEY);
  private Payment_url = environment.COURSE_API
  constructor(private http:HttpClient) { }

  createCheckoutSession(courseData:{courseId:string}){
    return this.http.post<{sessionId:string}>(`${this.Payment_url}payment/create-checkout-session`,courseData,{withCredentials:true})
  }

  async reditrectToCheckout(sessionId:string){
    const stripe = await this.stripe;
    if(stripe) {
      stripe.redirectToCheckout({sessionId})
    }
  }
}
