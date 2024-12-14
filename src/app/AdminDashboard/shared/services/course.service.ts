import { ApiResponse, Category, section } from './../models/courseModels';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

constructor(private http:HttpClient) { }

private API_URL  = environment.COURSE_API;
course = 'courses/'
section = 'section/'

uploadCourse(formData:FormData):Observable<any>{
  console.log(formData);
  return this.http.post(`${this.API_URL}${this.course}add-course`,formData)
}

getCategory():Observable<ApiResponse<Category>> {
  return this.http.get<ApiResponse<Category>>(`${this.API_URL}courses/get-category`)
}

addSection(title:string,courseId:string):Observable<any> {
  const body = { title };  // Send both courseId and title in the request body
  return this.http.post<any>(`${this.API_URL}${this.section}addSection/${courseId}`,body)
}

}
