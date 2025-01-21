import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http:HttpClient) { }
private CART_URL = environment.COURSE_API
readonly course = 'course'

addCart(userId:string,courseId:string):Observable<any>{
  return this.http.post<any>(`${this.CART_URL}${this.course}/add-to-cart`,{userId,courseId})
}

}
