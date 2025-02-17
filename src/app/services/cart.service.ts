import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http:HttpClient) { }
private CART_URL = environment.COURSE_API
readonly course = 'course'

addCart(courseId:string):Observable<any>{
  return this.http.post<any>(`${this.CART_URL}${this.course}/add-to-cart`,{courseId},{withCredentials:true})
}

getCart():Observable<{cart:any}>{
  return this.http.get<{cart:any}>(`${this.CART_URL}${this.course}/cart-items`,{withCredentials:true})
}

removeCart(courseId:string):Observable<any>{
  return this.http.delete(`${this.CART_URL}${this.course}/remove-course/${courseId}`,{withCredentials:true})
}

}
