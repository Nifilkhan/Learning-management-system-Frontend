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

uploadCourse(courseData:any):Observable<any>{
  console.log(courseData);
  return this.http.post(`${this.API_URL}${this.course}add-course`,courseData)
}

getCategory():Observable<ApiResponse<Category>> {
  return this.http.get<ApiResponse<Category>>(`${this.API_URL}courses/get-category`)
}

addSection(title: string, courseId: string): Observable<any> {
  return this.http.post(`${this.API_URL}section/addSection/${courseId}`, { title });
}

getSections(courseId: string): Observable<any> {
  return this.http.get(`${this.API_URL}section/get-section/${courseId}`);
}

deleteSection(courseId:string,sectionId:string):Observable<any> {
  return this.http.delete(`${this.API_URL}section/course/${courseId}/section/${sectionId}`)
}

editSection(courseId:string,sectionId:string,title:string):Observable<any> {
  return this.http.put(`${this.API_URL}section/course/${courseId}/section/${sectionId}`,{title})
}

}
